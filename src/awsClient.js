const { IAMClient } = require("@aws-sdk/client-iam");
const REGION = "us-east-1";
exports.iamClient = new IAMClient({ region: REGION });
