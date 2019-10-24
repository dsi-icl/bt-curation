export function cicheck(obj: any) {
    if (!obj.ci_breastfeed) {
        console.error(`${obj.subj_id}\tCI\tmissing\tbreastfeed`);
    }

    if (obj.ci_breastfeed === 'Yes but not breastfeeding any more<br> How old was your child when you stopped breastfeeding them? (weeks)' &&
        !obj.ci_breastfeed_stopped_age
    ) {
        console.error(`${obj.subj_id}\tCI\tmissing (follow-up)\tbreastfeed stop (age)`);
    }

    if (obj.ci_breastfeed === 'Yes but not breastfeeding any more<br> How old was your child when you stopped breastfeeding them? (weeks)' &&
        obj.ci_breastfeed_stopped_age &&
        obj.group === 'GC_itmSEGrp1' &&
        obj.ci_breastfeed_stopped_age > 2
    ) {
        console.error(`${obj.subj_id}\tCI\trange\tbreastfeed stop (age)`);
    }

    if (obj.ci_breastfeed === 'Yes but not breastfeeding any more<br> How old was your child when you stopped breastfeeding them? (weeks)' &&
        obj.ci_breastfeed_stopped_age &&
        obj.group !== 'GC_itmSEGrp1' &&
        obj.ci_breastfeed_stopped_age > 500
    ) {
        console.error(`${obj.subj_id}\tCI\trange\tbreastfeed stop (age)`);
    }

    if (!obj.ci_vaccine && obj.group !== 'GC_itmSEGrp1') {
        console.error(`${obj.subj_id}\tCI\tmissing\tvaccine for group 2-4`);
    }

    if (obj.ci_vaccine === 'No<br>Please give details' && obj.group !== 'GC_itmSEGrp1' && !obj.ci_not_vaccinated_reason_freetext) {
        console.error(`${obj.subj_id}\tCI\tmissing\tvaccine for group 2-4 (follow-up)`);
    }

    if (!obj.ci_mother_back_to_work && obj.group !== 'GC_itmSEGrp1') {
        console.error(`${obj.subj_id}\tCI\tmissing\tmother back to work`);
    }

    if (obj.ci_mother_back_to_work === 'Yes<br>How old was your child when their mother first went back to work? (months)' && !obj.ci_mother_back_to_work_age) {
        console.error(`${obj.subj_id}\tCI\tmissing\tmother back to work (follow-up)`);
    }

    if (!obj.ci_have_siblings) {
        console.error(`${obj.subj_id}\tCI\tmissing\thave siblings`);
    }

    if (obj.ci_have_siblings === 'GC_CI71' && !obj.ci_num_siblings) {
        console.error(`${obj.subj_id}\tCI\tmissing\thave siblings (number, follow-up)`);
    }

    if (obj.ci_have_siblings === 'GC_CI71' && !obj.ci_num_older_siblings) {
        console.error(`${obj.subj_id}\tCI\tmissing\thave siblings (number of older, follow-up)`);
    }

    if (obj.ci_have_siblings && obj.ci_num_older_siblings) {
        if (obj.group === 'GC_itmSEGrp1' && obj.ci_num_siblings !== obj.ci_num_older_siblings) {
            console.error(`${obj.subj_id}\tCI\tlogic\tgroup 1 older sibling not equal to total siblings`);
        }
    }

    if (!obj.ci_household_size) {
        console.error(`${obj.subj_id}\tCI\tmissing\thousehold_size`);
    }

    if (!obj.ci_household_num_adults) {
        console.error(`${obj.subj_id}\tCI\tmissing\thousehold_num_adults`);
    }

    if (!obj.ci_household_num_children) {
        console.error(`${obj.subj_id}\tCI\tmissing\thousehold_num_children`);
    }

    if (obj.ci_household_size && obj.ci_household_num_adults && obj.ci_household_num_children) {
        if (parseInt(obj.ci_household_size) !== ( parseInt(obj.ci_household_num_adults) + parseInt(obj.ci_household_num_children))) {
            console.error(`${obj.subj_id}\tCI\tlogic\thousehold size not equal to adult + children`);
        }
    }

    if (!obj.ci_household_num_bedrooms) {
        console.error(`${obj.subj_id}\tCI\tmissing\thousehold_num_bedrooms`);
    }
}