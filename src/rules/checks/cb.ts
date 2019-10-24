export function cbcheck(obj: any) {
    if (!obj.cb_duration_pregnancy) {
        console.error(`${obj.subj_id}\tCB\tmissing\tduration of pregnancy`);
    } else if (obj.cb_duration_pregnancy < 37) {
        console.error(`${obj.subj_id}\tCB\trange\tpregnancy duration < 37 weeks`);
    }


    if (!obj.cb_antibiotics_during_pregnancy) {
        console.error(`${obj.subj_id}\tCB\tmissing\tantibiotics`);
    }

    if (obj.cb_antibiotics_during_pregnancy === 'YES' && !obj.cb_antibiotics_during_pregnancy_course_number) {
        console.error(`${obj.subj_id}\tCB\tmissing\tantibiotics course number, having answered YES to having any`);
    }

    if (!obj.cb_birth_weight) {
        console.error(`${obj.subj_id}\tCB\tmissing\tbirth weight`);
    } else if (parseInt(obj.cb_birth_weight) < 1000 || parseInt(obj.cb_birth_weight) > 6000) {
        console.error(`${obj.subj_id}\tCB\trange\tbirth weight`);
    }

    if (!obj.cb_head_cf) {
        console.error(`${obj.subj_id}\tCB\tmissing\thead circumference`);
    } else if (parseInt(obj.cb_head_cf) < 30 || parseInt(obj.cb_head_cf) > 60) {
        console.error(`${obj.subj_id}\tCB\trange\thead cf out of range`);
    }

    if (!obj.cb_length) {
        console.error(`${obj.subj_id}\tCB\tmissing\tbirth length`);
    } else if (parseInt(obj.cb_length) < 40 || parseInt(obj.cb_length) > 60) {
        console.error(`${obj.subj_id}\tCB\trange\tbirth length out of range`);
    }

    if (!obj.cb_delivery) {
        console.error(`${obj.subj_id}\tCB\tmissing\tdelivery method`);
    }

    if (!obj.cb_time_in_NICU) {
        console.error(`${obj.subj_id}\tCB\tmissing\ttime in nicu`);
    }
}