export function micheck(obj: any) {
    if (!obj.mi_education) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother education`);
    }

    if (obj.mi_education === 'Other<br>Please specify' && !obj.mi_education_other_freetext) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother education free text for other`);
    }

    if (!obj.mi_employed) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother employment`);
    }

    if (obj.mi_employed === 'Yes<br>Please specify' && !obj.mi_employed_specify_freetext) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother employed free text for YES`);
    }

    if (!obj.mi_smoke) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother smoke`);
    }

    if (obj.mi_smoke === 'Yes<br>Did their mother stop smoking or reduce the number of cigarettes that she smoked when she found out that she was pregnant?' && !obj.mi_smoke_stop_during_pregancy) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother smoker but didnt answer if she stopped`);
    }

    if (obj.mi_smoke === 'No, ex-smoker<br>Did their mother stop smoking or reduce the number of cigarettes that she smoked when she found out that she was pregnant?' && !obj.mi_smoke_stop_during_pregancy) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother exsmoker but didnt answer if she stopped`);
    }

    if (!obj.mi_vape) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother vape`);
    }

    if (obj.mi_vape === 'Yes<br>Did their mother stop vaping or reduce the amount of vaping when she found out that she was pregnant?' && !obj.mi_vape_stop_during_pregancy) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother vaper but didnt answer if she stopped`);
    }

    if (obj.mi_vape === 'No, ex-vaper<br>Did their mother stop vaping or reduce the amount of vaping when she found out that she was pregnant?' && !obj.mi_vape_stop_during_pregancy) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother exvaper but didnt answer if she stopped`);
    }

    if (!obj.mi_passive_smoke) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother passive smoke`);
    }

    if (!obj.mi_supplements) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother supplements`);
    }

    if (obj.mi_supplements === 'Yes<br>Please specify' && !obj.mi_supplements_specify_freetext) {
        console.error(`${obj.subj_id}\tMI\tmissing\tYES to mother supplements but didnt answer which one.`);
    }

    if (!obj.mi_wheeze_ever) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother wheeze.`);
    }

    if (obj.mi_wheeze_ever === 'Yes<br>Has their mother ever had wheezing or whistling in her chest in the last 12 months?' && !obj.mi_wheeze_past12) {
        console.error(`${obj.subj_id}\tMI\tmissing\tYES to wheeze but havent answered past 12 months.`);
    }

    if (!obj.mi_asthma) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother asthma.`);
    }

    if (obj.mi_asthma === 'Yes<br>Was it diagnosed by a doctor?' && !obj.mi_asthma_doctor_diagnosed) {
        console.error(`${obj.subj_id}\tMI\tmissing\tYES to asthma but havent answered doctor diagnose.`);
    }

    if (obj.mi_asthma === 'Yes<br>Was it diagnosed by a doctor?' && !obj.fh_asthma_m) {
        console.error(`${obj.subj_id}\tMI\tlogic\tashtma mismatch with family history`);
    }

    if (!obj.mi_sneeze) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother sneeze.`);
    }

    if (obj.mi_sneeze === 'Yes<br>In the past 12 months, has their mother had a problem with sneezing, or a runny or a blocked nose when she did not have a cold or the flu?' && !obj.mi_sneeze_past12) {
        console.error(`${obj.subj_id}\tMI\tmissing\tYES to sneeze but havent answered past12.`);
    }

    if (!obj.mi_hay) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother hayfever.`);
    }

    if (obj.mi_hay === 'Yes' && !obj.fh_hay_m) {
        console.error(`${obj.subj_id}\tMI\tlogic\thay fever mismatch with family history`);
    }

    if (!obj.mi_eczema) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother eczema.`);
    }

    if (obj.mi_eczema === 'Yes' && !obj.fh_eczema_m) {
        console.error(`${obj.subj_id}\tMI\tlogic\teczema mismatch with family history`);
    }

    if (!obj.mi_food_allergy) {
        console.error(`${obj.subj_id}\tMI\tmissing\tmother food allergy.`);
    }

    if (obj.mi_food_allergy === 'Yes<br>Was it diagnosed by a doctor?' && !obj.mi_food_allergy_doctor_diagnosed) {
        console.error(`${obj.subj_id}\tMI\tmissing\tYES to food allergy but havent answered doctor diagnosed.`);
    }
}