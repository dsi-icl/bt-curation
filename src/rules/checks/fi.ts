export function ficheck(obj: any) {
    if (!obj.fi_education) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather education`);
    }

    if (obj.fi_education === 'Other<br>Please specify' && !obj.fi_education_other_freetext) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather education free text for other (cb question 1.1).`);
    }

    if (!obj.fi_employed) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather employment (cb question 2).`);
    }

    if (obj.fi_employed === 'Yes<br>Please specify' && !obj.fi_employed_specify_freetext) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather employed free text for YES (cb question 2.1).`);
    }

    if (!obj.fi_smoke) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather smoke (cb question 2).`);
    }

    if (!obj.fi_vape) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather vape (cb question 2).`);
    }

    if (!obj.fi_wheeze_ever) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather wheeze.`);
    }

    if (obj.fi_wheeze_ever === 'Yes<br>Has their father ever had wheezing or whistling in his chest in the last 12 months?' && !obj.fi_wheeze_past12) {
        console.error(`${obj.subj_id}\tFI\tmissing\tYES to wheeze but havent answered past 12 months.`);
    }

    if (!obj.fi_asthma) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather asthma.`);
    }

    if (obj.fi_asthma === 'Yes<br>Was it diagnosed by a doctor?' && !obj.fi_asthma_doctor_diagnosed) {
        console.error(`${obj.subj_id}\tFI\tmissing\tYES to asthma but havent answered doctor diagnose.`);
    }

    if (obj.fi_asthma === 'Yes<br>Was it diagnosed by a doctor?' && !obj.fh_asthma_f) {
        console.error(`${obj.subj_id}\tFI\tlogic\tashtma mismatch with family history`);
    }

    if (!obj.fi_sneeze) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather sneeze.`);
    }

    if (obj.fi_sneeze === 'Yes<br>In the past 12 months, has their father had a problem with sneezing, or a runny or a blocked nose when he did not have a cold or the flu?' && !obj.fi_sneeze_past12) {
        console.error(`${obj.subj_id}\tFI\tmissing\tYES to sneeze but havent answered past12.`);
    }

    if (!obj.fi_hay) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather hayfever.`);
    }

    if (obj.fi_hay === 'Yes' && !obj.fh_hay_f) {
        console.error(`${obj.subj_id}\tFI\tlogic\thay fever mismatch with family history`);
    }

    if (!obj.fi_eczema) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather eczema.`);
    }

    if (obj.fi_eczema === 'Yes' && !obj.fh_eczema_f) {
        console.error(`${obj.subj_id}\tFI\tlogic\teczema mismatch with family history`);
    }

    if (!obj.fi_food_allergy) {
        console.error(`${obj.subj_id}\tFI\tmissing\tfather food allergy.`);
    }

    if (obj.fi_food_allergy === 'Yes<br>Was it diagnosed by a doctor?' && !obj.fi_food_allergy_doctor_diagnosed) {
        console.error(`${obj.subj_id}\tFI\tmissing\tYES to food allergy but havent answered doctor diagnosed.`);
    }
}