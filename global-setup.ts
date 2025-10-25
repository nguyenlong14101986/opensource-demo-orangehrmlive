import { rimraf } from "rimraf";

export default async function globalSetup() {
    await rimraf('./allure-results');
}
