export function sptcheck(obj: any) {
    if (obj.group === 'GC_itmSEGrp1') { return; }
    if (obj.group !== 'GC_itmSEGrp1' && !obj.spt_has_data) {
        console.error(`${obj.subj_id}\tSPT\tno data\t${obj.group}\tno data`);
        return;
    }
    if (!obj.spt_done) {
        console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt attempted or not`);
    } else if (obj.eno_attempted === 'Yes<br>Date of test') {
        if (!obj.spt_date) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt date`);
        }

        if (!obj.spt_grass) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_grass`);
        }

        if (!obj.spt_cat) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_cat`);
        }

        if (!obj.spt_dog) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_dog`);
        }
        if (!obj.spt_house_dust_mite_dp) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_dust mite dp`);
        }
        if (!obj.spt_house_dust_mite_df) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_dust mite df`);
        }
        if (!obj.spt_aspergillus) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_aspergillus`);
        }
        if (!obj.spt_tree) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_tree`);
        }
        if (!obj.spt_peanut) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_peanut`);
        }
        if (!obj.spt_milk) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_milk`);
        }
        if (!obj.spt_egg) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_egg`);
        }
        if (!obj.spt_alternaria_alternata) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_alternaria_alternata`);
        }
        if (!obj.spt_cladosporium) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_cladosporium`);
        }
        if (!obj.spt_penicillium) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_penicillium`);
        }
        if (!obj.spt_positive_control) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_pos_control`);
        }
        if (!obj.spt_negative_control) {
            console.error(`${obj.subj_id}\tENO\tmissing\t${obj.group}\tspt_neg_control`);
        }
    }
}