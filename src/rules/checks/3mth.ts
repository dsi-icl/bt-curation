export function mth3check(obj: any) {

    if (obj.group !== 'GC_itmSEGrp1' || !obj.mh3_has_data) { return; }
    if (!obj.mh3_respiratory_probs_last_2w) {
        console.error(`${obj.subj_id}\t3MTH\tmissing\trespiratory problems in the last 2 weeks`);
    }

    if (obj.mh3_respiratory_probs_last_2w === 'Yes<br>Please specify' && !obj.mh3_respiratory_probs_last_2w_specify) {
        console.error(`${obj.subj_id}\t3MTH\tmissing\tfollow up to respiratory problems in the last 2 weeks`);
    }

    if (!obj.mh3_antibiotics_since_last){
        console.error(`${obj.subj_id}\t3MTH\tmissing\tantibiotics`);
    }

    if (obj.mh3_respiratory_probs_last_2w === 'Yes<br>Please specify name and their age at the time.' && !obj.mh3_antibiotics_specify_ages_and_name) {
        console.error(`${obj.subj_id}\t3MTH\tmissing\tfollow up to antibiotics`);
    }

    if (!obj.mh3_feed_cow_formula && !obj.mh3_feed_breastmilk && !obj.mh3_feed_solid && !obj.mh3_feed_hypo_formula && !obj.mh3_feed_other_freetext && !obj.mh3_feed_not_done) {
        console.error(`${obj.subj_id}\t3MTH\tmissing\tfeeding`);
    }
}