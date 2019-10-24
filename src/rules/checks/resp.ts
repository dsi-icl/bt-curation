export function respcheck(obj: any) {
    if (obj.group === 'GC_itmSEGrp1') { return; }
    if (obj.group !== 'GC_itmSEGrp1' && !obj.resp_has_data) {
        console.error(`${obj.subj_id}\tRESP\tno data\t${obj.group} but no data`);
        return;
    }
    if (!obj.resp_diagnosed_bronchiolitis) {
        console.error(`${obj.subj_id}\tRESP\tmissing\tbronchiolitis diagnosis`);
    }

    if (obj.resp_diagnosed_bronchiolitis === 'Yes<br>How old were they? (months)' && !obj.resp_diagnosed_bronchiolitis_month) {
        console.error(`${obj.subj_id}\tRESP\tmissing\tbronchiolitis diagnosis age follow up`);
    }

    if (!obj.resp_ever_wheeze) {
        console.error(`${obj.subj_id}\tRESP\tmissing\twheeze ever`);
    } else if (obj.resp_ever_wheeze === 'GC_RC1') {
        if (obj.resp_wheeze_clips === 'Yes<br>Which clips') {
            if (!obj.resp_wheeze_clips_1 && !obj.resp_wheeze_clips_2 && !obj.resp_wheeze_clips_3 && !obj.resp_wheeze_clips_4) {
                console.error(`${obj.subj_id}\tRESP\tlogic\tsaid yes to wheeze clips but did not indicate which`);
            }
        }

        if (!obj.resp_ever_wheeze_howmany_episodes) {
            console.error(`${obj.subj_id}\tRESP\tmissing\thow many episodes of wheeze`);
        }

        if (!obj.resp_ever_wheeze_age_start) {
            console.error(`${obj.subj_id}\tRESP\tmissing\twheeze starting age`);
        }

        if (!obj.resp_ever_wheeze_with_a_cold) {
            console.error(`${obj.subj_id}\tRESP\tmissing\twheeze with a cold`);
        }

        if (!obj.resp_ever_wheeze_with_chest_infection) {
            console.error(`${obj.subj_id}\tRESP\tmissing\twheeze with chest infection`);
        }

        if (!obj.resp_ever_wheeze_inbetween_cold_chest_infection) {
            console.error(`${obj.subj_id}\tRESP\tmissing\twheeze inbetween cold / chest infection`);
        }

        if (!obj.resp_ever_wheeze_wheezy_after_exercise) {
            console.error(`${obj.subj_id}\tRESP\tmissing\twheeze after exercise`);
        }
        if (!obj.resp_ever_wheeze_limit_speech) {
            console.error(`${obj.subj_id}\tRESP\tmissing\twheeze limits speech?`);
        }
        if (!obj.resp_wheeze_lastyear) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tresp_wheeze_lastyear`);
        }
        if (!obj.resp_ever_wheeze_last_6_months) {
            console.error(`${obj.subj_id}\tRESP\tmissing\twheeze in the last 6 months`);
        }
        if (!obj.resp_ever_wheeze_sleep_disturbed) {
            console.error(`${obj.subj_id}\tRESP\tmissing\twheeze disturbs sleep`);
        }

        if (obj.resp_ever_wheeze_allergens_food === 'Certain foods<br>Please specify' && !obj.resp_ever_wheeze_allergens_food_freetext) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not specify food allergens`);
        }

        if (obj.resp_ever_wheeze_allergens_furry_animal === 'Hairy/furry animals<br>Please specify' && !obj.resp_ever_wheeze_allergens_furry_animal_freetext) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not specify animal allergens`);
        }

        if (obj.resp_ever_wheeze_allergens_other === 'Other<br>Please specify' && !obj.resp_ever_wheeze_allergens_other_freetext) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not specify other allergens`);
        }
    }

    if (!obj.resp_diagnosed_asthma) {
        console.error(`${obj.subj_id}\tRESP\tmissing\tasthma diagnoses`);
    }

    if (obj.resp_diagnosed_asthma === 'Yes<br>What age was your child (in months)?' && !obj.resp_diagnosed_asthma_age) {
        console.error(`${obj.subj_id}\tRESP\tmissing\tage to asthma diagnoses`);
    }

    if (!obj.resp_treatment_breathing) {
        console.error(`${obj.subj_id}\tRESP\tmissing\tbreathing treatment`);
    } else if ( obj.resp_treatment_breathing === 'Yes<br>What treatment has been given?') {
        if (obj.resp_treatment_breathing_NO) {
            console.error(`${obj.subj_id}\tRESP\tlogic\tbreathing treatment YES but chose NO in detail`);
        }

        if (!obj.resp_treatment_breathing_NO && !obj.resp_treatment_breathing_inhaled_corticosteroids &&
            !obj.resp_treatment_breathing_oral_corticosteroids && !obj.resp_treatment_breathing_bronchodilators &&
            !obj.resp_treatment_breathing_others_freetext
            ) {
            console.error(`${obj.subj_id}\tRESP\tlogic\tbreathing treatment YES but chose nothing in detail`);
        }

        if (obj.resp_treatment_breathing_inhaled_corticosteroids !== '' &&
        !obj.resp_treatment_breathing_inhaled_corticosteroids_age) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not give age for inhaled corticosteroids`);
        }

        if (obj.resp_treatment_breathing_oral_corticosteroids !== '' &&
        !obj.resp_treatment_breathing_oral_corticosteroids_age) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not give age for oral corticosteroids`);
        }

        if (obj.resp_treatment_breathing_oral_corticosteroids !== '' &&
        !obj.resp_treatment_breathing_oral_corticosteroids_course_num) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not give number of course for oral corticosteroids`);
        }

        if (obj.resp_treatment_breathing_bronchodilators !== '' &&
        !obj.resp_treatment_breathing_bronchodilators_age) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not give age for bronchiodilator`);
        }

        if (obj.resp_treatment_breathing_bronchodilators !== '' &&
        !obj.resp_treatment_breathing_bronchodilators_relieve_symptoms) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not give symptom relieve (yes or no) for bronchiodilator`);

        }
        if (obj.resp_treatment_breathing_bronchodilators !== '' &&
        obj.resp_treatment_breathing_bronchodilators_relieve_symptoms === 'Yes' &&
        !obj.resp_treatment_breathing_bronchodilators_relieve_symptoms_time) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not give symptom relieve time for bronchiodilator`);
        }
    }
    if (!obj.resp_hospital_admission_asthma) {
            console.error(`${obj.subj_id}\tRESP\tmissing\thospital admission for asthma`);
    }
    if (!obj.resp_AE_asthma) {
            console.error(`${obj.subj_id}\tRESP\tmissing\temergency room due to asthma`);
    }
    if (!obj.resp_doctor_asthma) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tGP due to asthma`);
    }
    if (!obj.resp_daysoff_asthma) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdays off due to asthma`);
    }
    if (!obj.resp_dry_cough) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdry cough`);
    }
    if (obj.resp_dry_cough === 'Yes<br>How old were they when it started? (months)' && !obj.resp_dry_cough_age) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdry cough starting age`);
    }
    if (!obj.resp_chest_infection) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tchest infection`);
    }
    if (obj.resp_chest_infection === 'Yes<br>If so, how many in the last year?' && !obj.resp_chest_infection_howmany) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tchest infection how many times`);
    }

    if (!obj.resp_rash) {
        console.error(`${obj.subj_id}\tRESP\tmissing\trash`);
    } else if (obj.resp_rash === 'GC_YE1') {
        if (!obj.resp_rash_7days_up) {
            console.error(`${obj.subj_id}\tRESP\tmissing\trash more than 7 days`);
        }
        if (!obj.resp_rash_folds) {
            console.error(`${obj.subj_id}\tRESP\tmissing\trash affecting elbow folds`);
        }
        if (!obj.resp_rash_age) {
            console.error(`${obj.subj_id}\tRESP\tmissing\trash starting age`);
        }
        if (!obj.resp_rash_itchy) {
            console.error(`${obj.subj_id}\tRESP\tmissing\trash is it itchy?`);
        }
    }

    if (!obj.resp_sneezing_runny_blocked_nose) {
        console.error(`${obj.subj_id}\tRESP\tmissing\tsneezing, runny or blocked nose`);
    } else if (obj.resp_sneezing_runny_blocked_nose === 'Yes<br>Has this nose problem been accompanied by itchy-watery eyes?') {
        if (!obj.resp_sneezing_runny_blocked_nose_itchy_eyes) {
            console.error(`${obj.subj_id}\tRESP\tmissing\titchy eyes with sneezing, runny or blocked nose`);
        }
        if (!obj.resp_sneezing_runny_blocked_nose_last_year) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tsneezing, runny or blocked nose in the last year`);
        }
    }

    if (!obj.resp_animal_allergy) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tanimal allergy`);
    }
    if (!obj.resp_colds) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tcolds (at the bottom)`);
    }
    if (obj.resp_colds === 'Yes<br>If so, how many have they had in the last year? ' && !obj.resp_colds_numOf_lastyear) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not answer 'how many colds last year'`);
    }

    if (!obj.resp_food_prob) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tproblem with food (at the bottom)`);
    }
    if (!obj.resp_day_care) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tday care`);
    }
    if (obj.resp_day_care && obj.resp_day_care.indexOf('<br>') !== -1 && !obj.resp_day_care_age) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not answer age for daycare`);
    }
    if (!obj.resp_allergy_cover) {
        console.error(`${obj.subj_id}\tRESP\tmissing\tmattress_plastic_cover`);
    }

    if (!obj.resp_type_of_floor) {
        console.error(`${obj.subj_id}\tRESP\tmissing\ttype of floor in room`);
    }

    if (!obj.resp_pets) {
        console.error(`${obj.subj_id}\tRESP\tmissing\tpets`);
    } else if (obj.resp_pets === 'Yes<br>Pets') {
        if (!obj.resp_pets_dogs && !obj.resp_pets_cats && !obj.resp_pets_others) {
            console.error(`${obj.subj_id}\tRESP\tlogic\tsaid YES to having pets but did not choose any`);
        }
        if (obj.resp_pets_dogs !== '' && !obj.resp_pets_dogs_location) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not provide where pet dogs are allowed`);
        }
        if (obj.resp_pets_cats !== '' && !obj.resp_pets_cats_location) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not provide where pet cats are allowed`);
        }
        if (obj.resp_pets_others !== '' && !obj.resp_pets_others_location) {
            console.error(`${obj.subj_id}\tRESP\tmissing\tdid not provide where other pets are allowed`);
        }
    }

    if (!obj.resp_animal_exposure) {
        console.error(`${obj.subj_id}\tRESP\tmissing\tother animal exposure`);
    } else if (obj.resp_animal_exposure === 'Yes<br>Which pets') {
        if (!obj.resp_animal_exposure_dogs && !obj.resp_animal_exposure_cats && !obj.resp_animal_exposure_others) {
            console.error(`${obj.subj_id}\tRESP\tlogic\tsaid YES to having pets but did not choose any`);
        }
    }

    if (!obj.resp_antibiotics_course) {
        console.error(`${obj.subj_id}\tRESP\tmissing\tantibiotics (last question)`);
    }
}