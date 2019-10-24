import parse from 'csv-parse';
import fs from 'fs';

export function read_visit_info(path: string): Promise<{ study_version_id: string, visit_name: string, visit_code: string, visit_id: string }[]> {
    return new Promise((resolve, reject) => { fs.readFile(path, 'utf8', (err, data: string) => {
        if (err) { reject(err); }
        parse(data, { columns: true }, (errr, output)  => {
            if (err) { reject(errr); }
            const tranformedoutput = output.map((el: any) => ({
                study_version_id: el.STUDYVERSIONID,
                visit_name: el.VISITNAME,
                visit_code: el.VISITMNEMONIC,
                visit_id: el.VISITID
            })) as any;
            resolve(tranformedoutput);
        });
    }); });
}