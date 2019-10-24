import parse from 'csv-parse';
import fs from 'fs';

export function read_form_info(path: string): Promise<{ study_version_id: string, form_name: string, form_code: string, form_file_name: string, form_id: string }[]> {
    return new Promise((resolve, reject) => { fs.readFile(path, 'utf8', (err, data: string) => {
        if (err) { reject(err); }
        parse(data, { columns: true }, (errr, output)  => {
            if (err) { reject(errr); }
            const tranformedoutput = output.map((el: any) => ({
                study_version_id: el.STUDYVERSIONID,
                form_name: el.FORMNAME,
                form_code: el.FORMMNEMONIC,
                form_file_name: el.FORMREFNAME,
                form_id: el.FORMID
            })) as any ;
            resolve(tranformedoutput);
        });
    }); });
}