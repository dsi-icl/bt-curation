export function mth12check(obj: any) {
    if (obj.group !== 'GC_itmSEGrp1' || !obj.mh12_has_data) { return; }
    if (!obj.mh12_diagnosed_bronchiolitis) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\tbronchiolitis diagnosis`);
    }

    if (!obj.mh12_ever_wheeze) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\twheeze ever`);
    } else if (obj.mh12_ever_wheeze === 'GC_Wh1') {
        if (obj.mh12_wheeze_clips === 'Yes<br>Which clips') {
            if (!obj.mh12_wheeze_clips_1 && !obj.mh12_wheeze_clips_2 && !obj.mh12_wheeze_clips_3 && !obj.mh12_wheeze_clips_4) {
                console.error(`${obj.subj_id}\t12MTH\tlogic\tsaid yes to wheeze clips but did not indicate which`);
            }
        }

        if (!obj.mh12_ever_wheeze_howmany_episodes) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\thow many episodes of wheeze`);
        }

        if (!obj.mh12_ever_wheeze_age_start) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\twheeze starting age`);
        }

        if (!obj.mh12_ever_wheeze_with_a_cold) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\twheeze with a cold`);
        }

        if (!obj.mh12_ever_wheeze_with_chest_infection) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\twheeze with chest infection`);
        }

        if (!obj.mh12_ever_wheeze_inbetween_cold_chest_infection) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\twheeze inbetween cold / chest infection`);
        }

        if (!obj.mh12_ever_wheeze_wheezy_after_exercise) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\twheeze after exercise`);
        }
        if (!obj.mh12_ever_wheeze_limit_speech) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\twheeze limits speech?`);
        }
        if (!obj.mh12_ever_wheeze_similar_to_clip) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\twheeze similar to clip`);
        }
        if (!obj.mh12_ever_wheeze_last_6_months) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\twheeze in the last 6 months`);
        }
        if (!obj.mh12_ever_wheeze_sleep_disturbed) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\twheeze disturbs sleep`);
        }

        if (obj.mh12_ever_wheeze_allergens_food === 'Certain foods<br>Please specify' && !obj.mh12_ever_wheeze_allergens_food_freetext) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not specify food allergens`);
        }

        if (obj.mh12_ever_wheeze_allergens_furry_animal === 'Hairy/furry animals<br>Please specify' && !obj.mh12_ever_wheeze_allergens_furry_animal_freetext) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not specify animal allergens`);
        }

        if (obj.mh12_ever_wheeze_allergens_other === 'Other<br>Please specify' && !obj.mh12_ever_wheeze_allergens_other_freetext) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not specify other allergens`);
        }
    }

    if (!obj.mh12_diagnosed_asthma) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\tasthma diagnoses`);
    }

    if (obj.mh12_diagnosed_asthma === 'Yes<br>What age was your child (in months)?' && !obj.mh12_diagnosed_asthma_age) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\tage to asthma diagnoses`);
    }

    if (!obj.mh12_treatment_breathing) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\tbreathing treatment`);
    } else if ( obj.mh12_treatment_breathing === 'Yes<br>What treatment has been given?') {
        if (obj.mh12_treatment_breathing_NO) {
            console.error(`${obj.subj_id}\t12MTH\tlogic\tbreathing treatment YES but chose NO in detail`);
        }

        if (!obj.mh12_treatment_breathing_NO && !obj.mh12_treatment_breathing_inhaled_corticosteroids &&
            !obj.mh12_treatment_breathing_oral_corticosteroids && !obj.mh12_treatment_breathing_bronchodilators &&
            !obj.mh12_treatment_breathing_others_freetext
            ) {
            console.error(`${obj.subj_id}\t12MTH\tlogic\tbreathing treatment YES but chose nothing in detail`);
        }

        if (obj.mh12_treatment_breathing_inhaled_corticosteroids === 'Inhaled corticosteroids<br>How old was child when it was first given? (months)' &&
        !obj.mh12_treatment_breathing_inhaled_corticosteroids_age) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not give age for inhaled corticosteroids`);
        }

        if (obj.mh12_treatment_breathing_oral_corticosteroids === 'GC_Rg4' &&
        !obj.mh12_treatment_breathing_oral_corticosteroids_age) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not give age for oral corticosteroids`);
        }

        if (obj.mh12_treatment_breathing_oral_corticosteroids === 'GC_Rg4' &&
        !obj.mh12_treatment_breathing_oral_corticosteroids_course_num) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not give number of course for oral corticosteroids`);
        }

        if (obj.mh12_treatment_breathing_bronchodilators === 'GC_Rg2' &&
        !obj.mh12_treatment_breathing_bronchodilators_age) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not give age for bronchiodilator`);
        }

        if (obj.mh12_treatment_breathing_bronchodilators === 'GC_Rg2' &&
        !obj.mh12_treatment_breathing_bronchodilators_relieve_symptoms) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not give symptom relieve (yes or no) for bronchiodilator`);

        }
        if (obj.mh12_treatment_breathing_bronchodilators === 'GC_Rg2' &&
        obj.mh12_treatment_breathing_bronchodilators_relieve_symptoms === 'Yes' &&
        !obj.mh12_treatment_breathing_bronchodilators_relieve_symptoms_time) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not give symptom relieve time for bronchiodilator`);
        }
    }
    if (!obj.mh12_hospital_admission_asthma) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\thospital admission for asthma`);
    }
    if (!obj.mh12_AE_asthma) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\temergency room due to asthma`);
    }
    if (!obj.mh12_doctor_asthma) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tGP due to asthma`);
    }
    if (!obj.mh12_daysoff_asthma) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdays off due to asthma`);
    }
    if (!obj.mh12_dry_cough) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdry cough`);
    }
    if (obj.mh12_dry_cough === 'Yes<br>How old were they when it started? (months)' && !obj.mh12_dry_cough_age) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdry cough starting age`);
    }
    if (!obj.mh12_chest_infection) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tchest infection`);
    }
    if (obj.mh12_chest_infection === 'Yes<br>If so, how many in the last year?' && !obj.mh12_chest_infection_howmany) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tchest infection how many times`);
    }

    if (!obj.mh12_rash) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\trash`);
    } else if (obj.mh12_rash === 'GC_Rs61') {
        if (!obj.mh12_rash_7days_up) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\trash more than 7 days`);
        }
        if (!obj.mh12_rash_folds) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\trash affecting elbow folds`);
        }
        if (!obj.mh12_rash_age) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\trash starting age`);
        }
        if (!obj.mh12_rash_itchy) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\trash is it itchy?`);
        }
    }

    if (!obj.mh12_sneezing_runny_blocked_nose) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\tsneezing, runny or blocked nose`);
    } else if (obj.mh12_sneezing_runny_blocked_nose === 'Yes<br>Has this nose problem been accompanied by itchy-watery eyes?') {
        if (!obj.mh12_sneezing_runny_blocked_nose_itchy_eyes) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\titchy eyes with sneezing, runny or blocked nose`);
        }
    }

    if (!obj.mh12_animal_allergy) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tanimal allergy`);
    }
    if (!obj.mh12_colds) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tcolds (at the bottom)`);
    }
    if (obj.mh12_colds === 'Yes<br>If so, how many have they had in the last year? ' && !obj.mh12_colds_numOf_lastyear) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not answer 'how many colds last year'`);
    }

    if (!obj.mh12_food_prob) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tproblem with food (at the bottom)`);
    }
    if (!obj.mh12_day_care) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tday care`);
    }
    if (obj.mh12_day_care && obj.mh12_day_care.indexOf('<br>') !== -1 && !obj.mh12_day_care_age) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not answer age for daycare`);
    }
    if (!obj.mh12_mattress_plastic_cover) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\tmattress_plastic_cover`);
    }

    if (!obj.mh12_pets) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\tpets`);
    } else if (obj.mh12_pets === 'Yes<br>Pets') {
        if (!obj.mh12_pets_dogs && !obj.mh12_pets_cats && !obj.mh12_pets_others) {
            console.error(`${obj.subj_id}\t12MTH\tlogic\tsaid YES to having pets but did not choose any`);
        }
        if (obj.mh12_pets_dogs === 'Dog<br>Please specify where they are allowed' && !obj.mh12_pets_dogs_location) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not provide where pet dogs are allowed`);
        }
        if (obj.mh12_pets_cats === 'Cat<br>Please specify where they are allowed' && !obj.mh12_pets_cats_location) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not provide where pet cats are allowed`);
        }
        if (obj.mh12_pets_others === 'GC_Pys3' && !obj.mh12_pets_others_location) {
            console.error(`${obj.subj_id}\t12MTH\tmissing\tdid not provide where other pets are allowed`);
        }
    }

    if (!obj.mh12_animal_exposure) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\tother animal exposure`);
    } else if (obj.mh12_animal_exposure === 'Yes<br>Which pets') {
        if (!obj.mh12_animal_exposure_dogs && !obj.mh12_animal_exposure_cats && !obj.mh12_animal_exposure_others) {
            console.error(`${obj.subj_id}\t12MTH\tlogic\tsaid YES to having pets but did not choose any`);
        }
    }

    if (!obj.mh12_antibiotics_course) {
        console.error(`${obj.subj_id}\t12MTH\tmissing\tantibiotics (last question)`);
    }
}