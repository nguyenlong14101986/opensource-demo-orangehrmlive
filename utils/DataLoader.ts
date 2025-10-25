import fs from 'fs';
import path from 'path';
import { TestInfo } from '@playwright/test';

export class DataLoader {

    static load<T>(filename: string): T[] {
        const filePath = path.resolve(__dirname, '../resources', filename);
        if (!fs.existsSync(filePath)) {
            throw new Error(`JSON file not found: ${filename}`);
        }
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (!Array.isArray(data)) {
            throw new Error(`Expected array in file: ${filename}`);
        }
        return data;
    }

    static findById<T extends { id: string }>(filename: string, id: string): T | undefined {
        const allData = this.load<T>(filename);
        return allData.find(tc => tc.id === id);
    }

    static async loadFromTestInfo(testInfo: TestInfo): Promise<any | null> {
        try {
            const tags = testInfo.tags || [];
            const annotations = testInfo.annotations || [];
            const firstTag = tags.length > 0 ? tags[0] : null;
            const testcaseId = annotations.find(a => a.type === 'testcaseId')?.description;
            if (!firstTag || !testcaseId) {
                console.warn('Missing tag or testcaseId annotation.');
                return null;
            }
            const dataFile = `${firstTag.replace('@', '')}-data.json`;
            const data = this.findById(dataFile, testcaseId);
            if (!data) {
                console.warn(`No data found for ${testcaseId} in ${dataFile}`);
            } else {
                console.log(`Loaded test data from ${dataFile} for ${testcaseId}`);
            }
            return data;
        } catch (err) {
            console.error('Error loading test data:', err);
            return null;
        }
    }
}
