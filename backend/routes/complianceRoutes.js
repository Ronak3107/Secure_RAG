const express = require("express");

const router = express.Router();

const Log = require("../models/Log");

router.get("/", async (req, res) => {

  try {

    const totalLogs =
      await Log.countDocuments();

    const blockedLogs =
      await Log.countDocuments({
        status: "BLOCKED",
      });

    const allowedLogs =
      await Log.countDocuments({
        status: "ALLOWED",
      });

    const logs =
      await Log.find();

    let avgLatency = 0;

    if (logs.length > 0) {

      const totalLatency =
        logs.reduce(
          (acc, log) =>
            acc + (log.latency || 0),
          0
        );

      avgLatency =
        totalLatency / logs.length;
    }

    const complianceScore =
      totalLogs > 0
        ? (
            (allowedLogs / totalLogs)
            * 100
          ).toFixed(1)
        : 100;
        
    const gdprScore =
        Math.max(
            80,
            100 - blockedLogs
    );

    const hipaaScore =
    Math.max(
        82,
        100 - Math.floor(avgLatency / 100)
    );

    const isoScore =
    Math.max(
        85,
        100 - blockedLogs * 2
    );

    const socScore =
    complianceScore;

    res.json({

      totalLogs,

      blockedLogs,

      allowedLogs,

      avgLatency:
        avgLatency.toFixed(0),

      complianceScore,

      gdprScore,

      hipaaScore,

      isoScore,

      socScore,

    });

  } catch (error) {

    res.status(500).json({
      error:
        "Compliance data failed",
    });

  }

});

module.exports = router;