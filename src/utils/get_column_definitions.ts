import parse from 'csv-parse';
import fs from 'fs';

export function read_column_info(path: string): Promise<{ form_file_name: string, column_name: string, column_desc: string }[]> {
    return new Promise((resolve, reject) => { fs.readFile(path, 'utf8', (err, data: string) => {
        if (err) { reject(err); }
        parse(data, { columns: true }, (errr, output)  => {
            if (err) { reject(errr); }
            const tranformedoutput = output.map((el: any) => ({
                form_file_name: el.RD_VIEWNAME,
                column_name: el.RD_COLUMNNAME,
                column_desc: el.COLUMNDESC
            })) as any;
            resolve(tranformedoutput);
        });
    }); });
}