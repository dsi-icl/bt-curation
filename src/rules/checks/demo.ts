import moment from 'moment';

const GROUP_1_DATE_MIN = moment('2017-01-01', 'YYYY-MM-DD').valueOf();
const GROUP_1_DATE_MAX = moment('2018-12-31', 'YYYY-MM-DD').valueOf();

export function democheck(obj: any) {
    if (!obj.sex) {
        console.error(`${obj.subj_id}\tDEMO\tmissing\tSex`);
    }

    if (!obj.ethnicity_board) {
        console.error(`${obj.subj_id}\tDEMO\tmissing\tethnicity`);
    }

    if (obj.group === 'GC_itmSEGrp1') {
        if (obj.dob < GROUP_1_DATE_MIN || obj.dob > GROUP_1_DATE_MAX) {
            console.error(`${obj.subj_id}\tDEMO\trange\tgroup 1 birthday not between 2017-01-01 and 2018-12-31`);
        }
    } else if (obj.group === '2 - Pre-school'  || obj.group === '3 - Severe wheeze, pre-school') {
        if (obj.age_year && parseInt(obj.age_year) > 6) {
            console.error(`${obj.subj_id}\tDEMO\trange\tgroup 2/3 age > 6 years`);
        }
    } else if (obj.group === '4 - Severe asthma, school') {
        if (obj.age_year && parseInt(obj.age_year) < 6 || parseInt(obj.age_year) > 17) {
            console.error(`${obj.subj_id}\tDEMO\trange\tgroup 4 age should be between 6 and 17`);
        }
    } else {
        throw new Error(`${obj.subj_id} has no group`);
    }
}