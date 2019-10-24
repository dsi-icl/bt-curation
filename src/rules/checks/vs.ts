export function vscheck(obj: any) {
    if (obj.group === 'GC_itmSEGrp1') { return; }
    if (obj.group !== 'GC_itmSEGrp1' && !obj.vs_has_data) {
        console.error(`${obj.subj_id}\tVS\tno data\t${obj.group}\tno data`);
        return;
    }

    if (!obj.vs_height) {
        console.error(`${obj.subj_id}\tVS\tmissing\t${obj.group}\theight`);
    }

    if (!obj.vs_weight) {
        console.error(`${obj.subj_id}\tVS\tmissing\t${obj.group}\tweight`);
    }

    if (!obj.vs_height_centile) {
        console.error(`${obj.subj_id}\tVS\tmissing\t${obj.group}\theight centile`);
    }

    if (!obj.vs_weight_centile) {
        console.error(`${obj.subj_id}\tVS\tmissing\t${obj.group}\tweight centile`);
    }

    if (!obj.vs_bmi) {
        console.error(`${obj.subj_id}\tVS\tmissing\t${obj.group}\tbmi`);
    }

    if (!obj.vs_bmi_centile) {
        console.error(`${obj.subj_id}\tVS\tmissing\t${obj.group}\tbmi centile`);
    }
}