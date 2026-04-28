import { printSummary } from "./test-utils";
import "./tests/analytics.test";
import "./tests/fraud.test";

const failed = printSummary();
if (failed > 0) process.exit(1);
