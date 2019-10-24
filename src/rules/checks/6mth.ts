export function mth6check(obj: any) {
    if (obj.group !== 'GC_itmSEGrp1' || !obj.mh6_has_data) { return; }
    if (!obj.mh6_respiratory_probs_last_2w) {
        console.error(`${obj.subj_id}\t6MTH\tmissing\trespiratory problems in the last 2 weeks`);
    }

    if (obj.mh6_respiratory_probs_last_2w === 'Yes<br>Please specify' && !obj.mh6_respiratory_probs_last_2w_specify) {
        console.error(`${obj.subj_id}\t6MTH\tmissing\tfollow up to respiratory problems in the last 2 weeks`);
    }

    if (!obj.mh6_antibiotics_since_last){
        console.error(`${obj.subj_id}\t6MTH\tmissing\tantibiotics`);
    }

    if (obj.mh6_respiratory_probs_last_2w === 'Yes<br>Please specify name and their age at the time.' && !obj.mh6_antibiotics_specify_ages_and_name) {
        console.error(`${obj.subj_id}\t6MTH\tmissing\tfollow up to antibiotics`);
    }

    if (!obj.mh6_feed_cow_formula && !obj.mh6_feed_breastmilk && !obj.mh6_feed_solid && !obj.mh6_feed_hypo_formula && !obj.mh6_feed_other_freetext && !obj.mh6_feed_not_done) {
        console.error(`${obj.subj_id}\t6MTH\tmissing\tfeeding`);
    }
}