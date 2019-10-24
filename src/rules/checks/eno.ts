export function enocheck(obj: any) {
    if (obj.group === 'GC_itmSEGrp1') { return; }
    if (obj.group !== 'GC_itmSEGrp1' && !obj.eno_has_data) {
        console.error(`${obj.subj_id}\tENO\tno data\t${obj.group}\tno data`);
        return;
    }
    if (!obj.eno_attempted) {
        console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\teno attempted or not`);
    } else if (obj.eno_attempted === 'GC_itmENOAttYN1') {
        if (!obj.eno_time) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\teno time`);
        }

        if (!obj.eno_1st_measurement) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\t1st measurement`);
        }

        if (!obj.eno_2nd_measurement) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\t2nd measurement`);
        }

        if (!obj.eno_3rd_measurement) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\t3rd measurement`);
        }
    }
}