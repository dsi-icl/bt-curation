import { read_column_info, read_form_info, read_visit_info } from './utils';
import fs from 'fs';
import parse from 'csv-parse/lib/sync';
import moment from 'moment';
import { SITE_CODES } from './dictionary/siteCode';
import { headers } from './dictionary/headers';
import { checkAllSubjects } from './rules/index';
import { EEXIST } from 'constants';

interface IColumnDictionary {
    [file_name: string]: {
        [column_name: string]: string
    }
}

async function main() {
    const column_info = await read_column_info('inform_data/RD_COLUMNLABELS.csv');
    const column_info_map: any = column_info.reduce((a: any, e: any) => {
        if (a[e.form_file_name] === undefined) {
            a[e.form_file_name] = {};
        }
        a[e.form_file_name][e.column_name] = e.column_desc;
        return a;
    }, {});
    const form_info = await read_form_info('inform_data/IRV_STUDYVERSION_FORMS.csv');
    const visit_info = await read_visit_info('inform_data/IRV_STUDYVERSION_VISITS.csv');

    const withdrawn:any = [];
    const termstring = fs.readFileSync('inform_data/RD_FRMTERM.csv').toString();
    const parsedTerm = parse(termstring, { columns: true });
    parsedTerm.forEach((el:any) => {
        withdrawn.push(el.SUBJECTNUMBERSTR);
    });


    const annotatedFilesAndColumns: IColumnDictionary = column_info.reduce((a: IColumnDictionary, e) => {
        if (!a[e.form_file_name]) {
            a[e.form_file_name] = {};
        }
        a[e.form_file_name][e.column_name] = e.column_desc;
        return a;
    }, {});

    // /* get subject Id info */
    // const subjectIdString = fs.readFileSync('inform_data/IRV_CUR_SUBJECT.csv').toString();
    // const parseSubject = parse(subjectIdString, { columns: true });
    // const transformedSubjectId = parseSubject.reduce((a: any, e: any) => {
    //     if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
    //     a[e.SUBJECTID] = e.SUBJECTNUMBERSTR;
    //     return a;
    // }, {});

    // /* get subject Id info */
    // const itemstring = fs.readFileSync('inform_data/RD_DATADICTIONARY.csv').toString();
    // const parseItem = parse(itemstring, { columns: true });
    // const transformedItem = parseItem.reduce((a: any, e: any) => {
    //     a[e.SUBJECTID] = e.SUBJECTNUMBERSTR;
    //     return a;
    // }, {});

    /* get group info */
    const groupstring = fs.readFileSync('inform_data/RD_FRMSYSENR.csv').toString();
    const parseGroup = parse(groupstring, { columns: true });
    const transformedGroup = parseGroup.reduce((a: any, e: any) => {
        //console.log(e.ITMSEGRP)
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            group: e.ITMSEGRP,
            antenatal_postnatal: e.ITMSEANTPST
        };
        a[e.SUBJECTNUMBERSTR] = transformedEntry;
        return a;
    }, {});

    // console.log(transformedGroup);

    /* get visit metadata */
    const dovstring = fs.readFileSync('inform_data/RD_FRMDOV.csv').toString();
    const parsedDov = parse(dovstring, { columns: true });
    const transformedDov = parsedDov.reduce((a: any, e: any) => {
        if (a[e.SUBJECTVISITID]) throw Error('hey');
        a[e.SUBJECTVISITID] = {
            dov: e.DOV,
            visitCode: e.VISITMNEMONIC,
            subjId: e.SUBJECTNUMBERSTR
        };
        return a;
    }, {});


    /* demographics */
    const demostring = fs.readFileSync('inform_data/RD_FRMDEMOG.csv').toString();
    const demoparsed = parse(demostring, { columns: true });
    const transformedDemo = demoparsed.reduce((a: any, e: any) => {
        // console.log(e);
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            subj_id: e.SUBJECTNUMBERSTR,
            location: SITE_CODES[e.SUBJECTNUMBERSTR.substring(0, 1)],
            dob: moment(e.ITMDEMPRTDOB_DTS, 'YYYY-MM-DD').valueOf(),
            age_day: e.ITMDEMAGEDYS,
            age_month: e.ITMDEMAGE,
            age_year: e.ITMDEMAGEYR,
            // dob: e.ITMDEMPRTDOB_DTS,
            sex: e.ITMDEMGEND || e.ITMDEMGEND_ND,
            ethnicity_board: e.ITMDEMETHNIC,
            ethnicity_detailed: e.ITMDEMETHWHITE || e.ITMDEMETHMIX || e.ITMDEMETHBLK || e.ITMDEMETHASN || '',
            ethnicity_other_freetext: e.ITMDEMANYOTHER || e.ITMDEMASNOTH || e.ITMDEMBLACKOTH || e.ITMDEMETHOTH || e.ITMDEMMIXOTH || ''
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, transformedGroup);

    /* family history */
    const familyhistorystring = fs.readFileSync('inform_data/RD_FRMFH.csv').toString();
    const familyhistoryparsed = parse(familyhistorystring, { columns: true });
    const transformedFamilyHistory = familyhistoryparsed.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            fh_asthma_f: e.ITMFH2_CITMFATHERFDE56980CDC,
            fh_asthma_m: e.ITMFH2_CITMMOTHER16A18EA4361,
            fh_asthma_s: e.ITMFH2_CITMSISTER61ADA59FBED,
            fh_asthma_b: e.ITMFH2_CITMBROTHERD7023A6D40,
            fh_asthma_hs: e.ITMFH2_CITMHALFSISTEREC0004F,
            fh_asthma_hb: e.ITMFH2_CITMHALFBROTHERF553A5,
            fh_eczema_f: e.ITMFH6_CITMFATHERFDE56980CDC,
            fh_eczema_m: e.ITMFH6_CITMMOTHER16A18EA4361,
            fh_eczema_s: e.ITMFH6_CITMSISTER61ADA59FBED,
            fh_eczema_b: e.ITMFH6_CITMBROTHERD7023A6D40,
            fh_eczema_hs: e.ITMFH6_CITMHALFSISTEREC0004F,
            fh_eczema_hb: e.ITMFH6_CITMHALFBROTHERF553A5,
            fh_hay_f: e.ITMFH4_CITMFATHERFDE56980CDC,
            fh_hay_m: e.ITMFH4_CITMMOTHER16A18EA4361,
            fh_hay_s: e.ITMFH4_CITMSISTER61ADA59FBED,
            fh_hay_b: e.ITMFH4_CITMBROTHERD7023A6D40,
            fh_hay_hs: e.ITMFH4_CITMHALFSISTEREC0004F,
            fh_hay_hb: e.ITMFH4_CITMHALFBROTHERF553A5,
            fh_comment_freetext: e.ITMFH7
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, transformedDemo);


    /* father info */
    const fatherinfostring = fs.readFileSync('inform_data/RD_FRMFI.csv').toString();
    const fatherinfoparsed = parse(fatherinfostring, { columns: true });
    const transformedFatherInfo = fatherinfoparsed.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            fi_education: e.FI1 || e.FI1_ND,
            fi_education_other_freetext: e.FI2,
            fi_employed: e.FI3 || e.FI3_ND,
            fi_employed_specify_freetext: e.FI4,
            fi_smoke: e.FI5 || e.FI5_ND,
            fi_vape: e.FI6 || e.FI6_ND,
            fi_wheeze_ever: e.FI7 || e.FI7_ND,
            fi_wheeze_past12: e.FI8,
            fi_asthma: e.FI9 || e.FI9_ND,
            fi_asthma_doctor_diagnosed: e.FI10,
            fi_sneeze: e.FI11 || e.FI11_ND,
            fi_sneeze_past12: e.FI12,
            fi_hay: e.FI13 || e.FI13_ND,
            fi_eczema: e.FI14 || e.FI14_ND,
            fi_food_allergy: e.FI15 || e.FI15_ND,
            fi_food_allergy_doctor_diagnosed: e.FI16,
            fi_comment_freetext: e.FI17
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, transformedFamilyHistory);


    /* mother info */
    const motherinfostring = fs.readFileSync('inform_data/RD_FRMMI.csv').toString();
    const motherinfoparsed = parse(motherinfostring, { columns: true });
    const transformedMotherInfo = motherinfoparsed.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            mi_education: e.MI1 || e.MI1_ND,
            mi_education_other_freetext: e.MI2,
            mi_employed: e.MI3 || e.MI3_ND,
            mi_employed_specify_freetext: e.MI4,
            mi_smoke: e.MI5 || e.MI5_ND,
            mi_smoke_stop_during_pregancy: e.MI6 || e.MI7,
            mi_vape: e.MI8 || e.MI8_ND,
            mi_vape_stop_during_pregancy: e.MI9 || e.MX,
            mi_passive_smoke: e.MP || e.MP_ND,
            mi_supplements: e.MS || e.MS_ND,
            mi_supplements_specify_freetext: e.MS3,
            mi_wheeze_ever: e.MIW || e.MIW_ND,
            mi_wheeze_past12: e.MIE,
            mi_asthma: e.MA || e.MA_ND,
            mi_asthma_doctor_diagnosed: e.MD,
            mi_sneeze: e.MU || e.MU_ND,
            mi_sneeze_past12: e.MT,
            mi_hay: e.MF || e.MF_ND,
            mi_eczema: e.MM || e.MM_ND,
            mi_food_allergy: e.ML || e.ML_ND,
            mi_food_allergy_doctor_diagnosed: e.MG,
            mi_comment_freetext: e.MC
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, transformedFatherInfo);

    /* child birth */
    const childbirthstring = fs.readFileSync('inform_data/RD_CB.csv').toString();
    const childbirthparsed = parse(childbirthstring, { columns: true });
    const transformedChildBirth = childbirthparsed.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            cb_duration_pregnancy: e.CB1,
            cb_antibiotics_during_pregnancy: e.CB2,
            cb_antibiotics_during_pregnancy_course_number: e.CB3,
            cb_birth_weight: e.CB4 || e.CB4_ND,
            cb_head_cf: e.CB5 || e.CB5_ND,
            cb_length: e.CB6 || e.CB6_ND,
            cb_delivery: e.CB7 || e.CB7_ND,
            cb_time_in_NICU: e.CB8,
            cb_comment_freetext: e.CB9
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, transformedMotherInfo);

    /* child info */
    const childinfostring = fs.readFileSync('inform_data/RD_CI.csv').toString();
    const childinfoparsed = parse(childinfostring, { columns: true });
    const transformedChildInfo = childinfoparsed.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            ci_breastfeed: e.CI1 || e.CI1_ND,
            ci_breastfeed_stopped_age: e.CI2,
            ci_vaccine: e.CI3 || e.CI3_ND,
            ci_not_vaccinated_reason_freetext: e.CI4,
            ci_mother_back_to_work: e.CI5 || e.CI5_ND,
            ci_mother_back_to_work_age: e.CI6,
            ci_have_siblings: e.CI7 || e.CI7_ND,
            ci_num_siblings: e.CI8,
            ci_num_older_siblings: e.CI9,
            ci_household_size: e.CI10 || e.CI10_ND,
            ci_household_num_adults: e.CI11 || e.CI11_ND,
            ci_household_num_children: e.CI12 || e.CI12_ND,
            ci_household_num_bedrooms: e.CI13 || e.CI13_ND,
            ci_comment_freetext: e.CI14
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, transformedChildBirth);

    /* 3month info */
    const threemonthstring = fs.readFileSync('inform_data/RD_MH3.csv').toString();
    const threemonthParse = parse(threemonthstring, { columns: true, delimiter: ',' });
    const threemonthinfo = threemonthParse.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            mh3_has_data: true,
            mh3_respiratory_probs_last_2w: e.M3A1 || e.M3A1_ND,
            mh3_respiratory_probs_last_2w_specify: e.M3A2,
            mh3_antibiotics_since_last: e.M3A3 || e.M3A3_ND,
            mh3_antibiotics_specify_ages_and_name: e.M3A4,
            mh3_feed_cow_formula: e.M3A5_CITMFDCWMLK4C307481480D,
            mh3_feed_breastmilk: e.M3A5_CITMFDBRST5A432DA1D0C4E,
            mh3_feed_solid: e.M3A5_CITMFDSOLIDS3F7F24DDF88,
            mh3_feed_hypo_formula: e.M3A5_CITMFDHYPO98D17A5686292,
            mh3_feed_other_freetext: e.M3A5_FDPS && e.FDPS,
            mh3_feed_not_done: e.M3A5_ND,
            mh3_comment: e.M3A6
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, transformedChildInfo);

    /* 6month info */
    const sixmonthstring = fs.readFileSync('inform_data/RD_MTH6.csv').toString();
    const sixmonthParse = parse(sixmonthstring, { columns: true, delimiter: ',' });
    const sixmonthinfo = sixmonthParse.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            mh6_has_data: true,
            mh6_respiratory_probs_last_2w: e.M6A1 || e.M6A1_ND,
            mh6_respiratory_probs_last_2w_specify: e.M6A2,
            mh6_antibiotics_since_last: e.M6A3 || e.M6A3_ND,
            mh6_antibiotics_specify_ages_and_name: e.M6A4,
            mh6_feed_cow_formula: e.M6A5_CITMFDCWMLK4C307481480D,
            mh6_feed_breastmilk: e.M6A5_CITMFDBRST5A432DA1D0C4E,
            mh6_feed_solid: e.M6A5_CITMFDSOLIDS3F7F24DDF88,
            mh6_feed_hypo_formula: e.M6A5_CITMFDHYPO98D17A5686292,
            mh6_feed_other_freetext: e.M6A5_M6A6 && e.M6A6,
            mh6_feed_not_done: e.M6A5_ND,
            mh6_comment: e.M6A7
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, threemonthinfo);

    /* 12month info */
    const twelvemonthstring = fs.readFileSync('inform_data/RD_Q.csv').toString();
    const twelvemonthParse = parse(twelvemonthstring, { columns: true, delimiter: ',' });
    const twelvemonthinfo = twelvemonthParse.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            mh12_has_data: true,
            mh12_diagnosed_bronchiolitis: e.BR || e.BR_ND,
            mh12_diagnosed_bronchiolitis_month: e.OM,
            mh12_ever_wheeze: e.WH || e.WH_ND,
            mh12_ever_wheeze_clips: e.VD,
            mh12_ever_wheeze_clips_1: e.CL_CITMBRTHCLP1AE162033BE945,
            mh12_ever_wheeze_clips_2: e.CL_CITMBRTHCLP2AF7162D656092,
            mh12_ever_wheeze_clips_3: e.CL_CITMBRTHCLP3594330E901253,
            mh12_ever_wheeze_clips_4: e.CL_CITMBRTHCLP44FB3B8D861C88,
            mh12_ever_wheeze_howmany_episodes: e.EW,
            mh12_ever_wheeze_age_start: e.O,
            mh12_ever_wheeze_with_a_cold: e.CD,
            mh12_ever_wheeze_with_chest_infection: e.WC,
            mh12_ever_wheeze_inbetween_cold_chest_infection: e.CH,
            mh12_ever_wheeze_wheezy_after_exercise: e.CE,
            mh12_ever_wheeze_limit_speech: e.WS,
            mh12_ever_wheeze_similar_to_clip: e.WW,
            mh12_ever_wheeze_last_6_months: e.CW,
            mh12_ever_wheeze_sleep_disturbed: e.SP,
            mh12_ever_wheeze_allergens_change_of_weather: e.CF_CITMCAUSCHANGE92D7FF5D45C,
            mh12_ever_wheeze_allergens_emotion: e.CF_CITMCAUSEMOTION93909F56EF,
            mh12_ever_wheeze_allergens_smokyrooms: e.CF_CITMCAUSSMOKYE25962947B9E,
            mh12_ever_wheeze_allergens_pollen: e.CF_CITMCAUSPOLLEN4DEB54D11AC,
            mh12_ever_wheeze_allergens_exercise: e.CF_CITMCAUSEXERCISEB9DE63546,
            mh12_ever_wheeze_allergens_vacuum: e.CF_CITMCAUSVACCUMEEE6D4F47C2,
            mh12_ever_wheeze_allergens_bed_dusting: e.CF_CITMCAUSBED4D6A842E80FC16,
            mh12_ever_wheeze_allergens_perfume: e.CF_CITMCAUSPERFUMD165A215AEF,
            mh12_ever_wheeze_allergens_food: e.CF_FD,
            mh12_ever_wheeze_allergens_food_freetext: e.FD,
            mh12_ever_wheeze_allergens_mould: e.CF_CITMCAUSMOLDSE7F08C72403B,
            mh12_ever_wheeze_allergens_furry_animal: e.CF_AN,
            mh12_ever_wheeze_allergens_furry_animal_freetext: e.AN,
            mh12_ever_wheeze_allergens_nasal_congestion: e.CF_CITMCAUSCOLDF1854CF7975C2,
            mh12_ever_wheeze_allergens_other: e.CF_OT,
            mh12_ever_wheeze_allergens_other_freetext: e.OT,
            mh12_diagnosed_asthma: e.AD || e.AD_ND,
            mh12_diagnosed_asthma_age: e.AG,
            mh12_treatment_breathing: e.RX || e.RX_ND,
            mh12_treatment_breathing_NO: e.RG_CITMDIAGNO63976BBEF096986,
            mh12_treatment_breathing_inhaled_corticosteroids: e.RG_IC,
            mh12_treatment_breathing_inhaled_corticosteroids_age: e.IC,
            mh12_treatment_breathing_oral_corticosteroids: e.RG_GCRG4,
            mh12_treatment_breathing_oral_corticosteroids_age: e.OC,
            mh12_treatment_breathing_oral_corticosteroids_course_num: e.CO,
            mh12_treatment_breathing_bronchodilators: e.RG_GCRG2,
            mh12_treatment_breathing_bronchodilators_age: e.BC,
            mh12_treatment_breathing_bronchodilators_relieve_symptoms: e.SY,
            mh12_treatment_breathing_bronchodilators_relieve_symptoms_time: e.QK,
            mh12_treatment_breathing_others_freetext: e.RG_OD && e.OD,
            mh12_hospital_admission_asthma: e.HAD || e.HAD_ND,
            mh12_AE_asthma: e.VAM || e.VAM_ND,
            mh12_doctor_asthma: e.GPA || e.GPA_ND,
            mh12_daysoff_asthma: e.DYA || e.DYA_ND,
            mh12_dry_cough: e.DCN || e.DCN_ND,
            mh12_dry_cough_age: e.YOL,
            mh12_chest_infection: e.CYN || e.CYN_ND,
            mh12_chest_infection_howmany: e.YHW,
            mh12_rash: e.RS6 || e.RS6_ND,
            mh12_rash_7days_up: e.RS7,
            mh12_rash_folds: e.RSE,
            mh12_rash_age: e.RAG,
            mh12_rash_itchy: e.RIT,
            mh12_sneezing_runny_blocked_nose: e.PNS || e.PNS_ND,
            mh12_sneezing_runny_blocked_nose_itchy_eyes: e.PEY,
            mh12_animal_allergy: e.AAN || e.AAN_ND,
            mh12_colds: e.CLD || e.CLD_ND,
            mh12_colds_numOf_lastyear: e.HWY,
            mh12_food_prob: e.AEF || e.AEF_ND,
            mh12_day_care: e.DYC || e.DYC_ND,
            mh12_day_care_age: e.CHM || e.NRY,
            mh12_mattress_plastic_cover: e.MPC || e.MPC_ND,
            mh12_pets: e.PYN || e.PYN_ND,
            mh12_pets_dogs: e.PYS_DGH,
            mh12_pets_dogs_location: e.DGH,
            mh12_pets_cats: e.PYS_CTH,
            mh12_pets_cats_location: e.CTH,
            mh12_pets_others: e.PYS_GCPYS3,
            mh12_pets_others_location: e.OPH,
            mh12_other_pets_freetext: e.LST,
            mh12_animal_exposure: e.EXA || e.EXA_ND,
            mh12_animal_exposure_dogs: e.WPT_CITMDOG886427073C18591C0,
            mh12_animal_exposure_cats: e.WPT_CITMCAT540B6BFFE258488A2,
            mh12_animal_exposure_others: e.WPT_OPT,
            mh12_animal_exposure_others_freetext: e.OPT,
            mh12_antibiotics_course: e.AB || e.AB_ND,
            mh12_comment_freetext: e.CM
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, sixmonthinfo);


    /* resp info */
    const respString = fs.readFileSync('inform_data/RD_R.csv').toString();
    const respParse = parse(respString, { columns: true, delimiter: ',' });
    const respinfo = respParse.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            resp_has_data: true,
            resp_diagnosed_bronchiolitis: e.RA || e.RA_ND,
            resp_diagnosed_bronchiolitis_month: e.RB,
            resp_ever_wheeze: e.RC || e.RC_ND,
            resp_ever_wheeze_clips: e.RD,
            resp_ever_wheeze_clips_1: e.RE_CITMBRTHCLP1AE162033BE945,
            resp_ever_wheeze_clips_2: e.RE_CITMBRTHCLP2AF7162D656092,
            resp_ever_wheeze_clips_3: e.RE_CITMBRTHCLP3594330E901253,
            resp_ever_wheeze_clips_4: e.RE_CITMBRTHCLP44FB3B8D861C88,
            resp_ever_wheeze_howmany_episodes: e.RS,
            resp_ever_wheeze_age_start: e.RW,
            resp_ever_wheeze_with_a_cold: e.RG,
            resp_ever_wheeze_with_chest_infection: e.RZ,
            resp_ever_wheeze_inbetween_cold_chest_infection: e.RH,
            resp_ever_wheeze_wheezy_after_exercise: e.RL,
            resp_ever_wheeze_limit_speech: e.MR,
            resp_ever_wheeze_last_6_months: e.RJ,
            resp_wheeze_lastyear: e.RI,
            resp_ever_wheeze_sleep_disturbed: e.RK,
            resp_ever_wheeze_allergens_change_of_weather: e.RN_CITMCAUSCHANGE92D7FF5D45C,
            resp_ever_wheeze_allergens_emotion: e.RN_CITMCAUSEMOTION93909F56EF,
            resp_ever_wheeze_allergens_smokyrooms: e.RN_CITMCAUSSMOKYE25962947B9E,
            resp_ever_wheeze_allergens_pollen: e.RN_CITMCAUSPOLLEN4DEB54D11AC,
            resp_ever_wheeze_allergens_exercise: e.RN_CITMCAUSEXERCISEB9DE63546,
            resp_ever_wheeze_allergens_vacuum: e.RN_CITMCAUSVACCUMEEE6D4F47C2,
            resp_ever_wheeze_allergens_bed_dusting: e.RN_CITMCAUSBED4D6A842E80FC16,
            resp_ever_wheeze_allergens_perfume: e.RN_CITMCAUSPERFUMD165A215AEF,
            resp_ever_wheeze_allergens_food: e.RN_FDS,
            resp_ever_wheeze_allergens_food_freetext: e.FDS,
            resp_ever_wheeze_allergens_mould: e.RN_CITMCAUSMOLDSE7F08C72403B,
            resp_ever_wheeze_allergens_furry_animal: e.RN_H1,
            resp_ever_wheeze_allergens_furry_animal_freetext: e.H1,
            resp_ever_wheeze_allergens_nasal_congestion: e.RN_CITMCAUSCOLDF1854CF7975C2,
            resp_ever_wheeze_allergens_other: e.RN_OT,
            resp_ever_wheeze_allergens_other_freetext: e.OT,
            resp_diagnosed_asthma: e.DS || e.DS_ND,
            resp_diagnosed_asthma_age: e.YG,
            resp_treatment_breathing: e.RT || e.RT_ND,
            resp_treatment_breathing_given_last_year: e.GL,
            resp_treatment_breathing_used_some_last_year: e.US,
            resp_treatment_breathing_NO: e.YM_CITMDIAGNO63976BBEF096986,
            resp_treatment_breathing_inhaled_corticosteroids: e.YM_GCYM3,
            resp_treatment_breathing_inhaled_corticosteroids_age: e.IY,
            resp_treatment_breathing_oral_corticosteroids: e.YM_GCYM4,
            resp_treatment_breathing_oral_corticosteroids_age: e.OL,
            resp_treatment_breathing_oral_corticosteroids_course_num: e.CL,
            resp_treatment_breathing_bronchodilators: e.YM_GCYM2,
            resp_treatment_breathing_bronchodilators_age: e.RR,
            resp_treatment_breathing_bronchodilators_relieve_symptoms: e.GU,
            resp_treatment_breathing_bronchodilators_relieve_symptoms_time: e.QR,
            resp_treatment_breathing_others_freetext: e.YM_OD && e.OD,
            resp_hospital_admission_asthma: e.HA || e.HA_ND,
            resp_AE_asthma: e.RV || e.RV_ND,
            resp_doctor_asthma: e.OH || e.OH_ND,
            resp_daysoff_asthma: e.NS || e.NS_ND,
            resp_dry_cough: e.CY || e.CY_ND,
            resp_dry_cough_age: e.SA,
            resp_chest_infection: e.CF || e.CF_ND,
            resp_chest_infection_howmany: e.HM,
            resp_rash: e.YE || e.YE_ND,
            resp_rash_7days_up: e.YD,
            resp_rash_folds: e.SR,
            resp_rash_age: e.DT,
            resp_rash_itchy: e.YT,
            resp_rash_in_last_year: e.EY || e.EY_ND,
            resp_problem_with_sneezing: e.DH || e.DH_ND,
            resp_sneezing_runny_blocked_nose: e.DH || e.DH_ND,
            resp_sneezing_runny_blocked_nose_last_year: e.NM,
            resp_sneezing_runny_blocked_nose_itchy_eyes: e.NP,
            resp_animal_allergy: e.F1 || e.F1_ND,
            resp_colds: e.F2 || e.F2_ND,
            resp_colds_numOf_lastyear: e.F3,
            resp_food_prob: e.C1 || e.C1_ND,
            resp_day_care: e.F14 || e.F14_ND,
            resp_day_care_age: e.F16 || e.F15,
            resp_type_of_floor: e.F17 || e.F17_ND,
            resp_type_of_floor_other_free_text: e.F18,
            resp_allergy_cover: e.F19 || e.F19_ND,
            resp_pets: e.F20 || e.F20_ND,
            resp_pets_dogs: e.F21_F22,
            resp_pets_dogs_location: e.F22,
            resp_pets_cats: e.F21_F23,
            resp_pets_cats_location: e.F23,
            resp_pets_others: e.F21_GCF213,
            resp_pets_others_location: e.F24,
            resp_other_pets_freetext: e.LTP,
            resp_animal_exposure: e.REX || e.REX_ND,
            resp_animal_exposure_dogs: e.YWP_CITMDOG886427073C18591C0,
            resp_animal_exposure_cats: e.YWP_CITMCAT540B6BFFE258488A2,
            resp_animal_exposure_others: e.YWP_OPE,
            resp_animal_exposure_others_freetext: e.OPE,
            resp_antibiotics_course: e.QAB || e.QAB_ND,
            resp_comment_freetext: e.CMS

        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, twelvemonthinfo);

    /* vs info */
    const vsstring = fs.readFileSync('inform_data/RD_FRMVS.csv').toString();
    const vsparse = parse(vsstring, { columns: true, delimiter: ',' });
    const vsinfo = vsparse.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            vs_has_data: true,
            vs_height: e.ITMVSHGHT || e.ITMVSHGHT_ND,
            vs_weight: e.ITMVSWGHT || e.ITMVSWGHT_ND,
            vs_height_centile: e.ITMVSHGCT || e. ITMVSHGCT_ND,
            vs_weight_centile: e.ITMVSWGCT || e.ITMVSWGCT_ND,
            vs_bmi: e.ITMVSBMI || e.ITMVSBMI_ND,
            vs_bmi_centile: e.ITMVSBMICT || e.ITMVSBMICT_ND,
            vs_comments: e.ITMVSCMT
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, respinfo);


    /* eno info */
    const enostring = fs.readFileSync('inform_data/RD_FRMENO.csv').toString();
    const enoparse = parse(enostring, { columns: true, delimiter: ',' });
    const enoinfo = enoparse.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            eno_has_data: true,
            eno_attempted: e.ITMENOATTYN || e.ITMENOATTYN_ND,
            eno_time: e.ITMENOATTYTIM,
            eno_1st_measurement: e.ITMENO1STMEAS,
            eno_2nd_measurement: e.ITMENO2NDMEAS,
            eno_3rd_measurement: e.ITMENO3RDMEAS
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, vsinfo);

    /* spt info */
    const sptstring = fs.readFileSync('inform_data/RD_FRMSPT.csv').toString();
    const sptparse = parse(sptstring, { columns: true, delimiter: ',' });
    const sptinfo = sptparse.reduce((a: any, e: any) => {
        if (e.SUBJECTNUMBERSTR.indexOf('SCR') !== -1) { return a; }
        const transformedEntry = {
            spt_has_data: true,
            spt_done: e.ITMSPTDONE,
            spt_date: e.ITMSPTDAT_DTS,
            spt_grass: e.ITMSPTGRAS || e.ITMSPTGRAS_ND,
            spt_cat: e.ITMSPTCAT || e.ITMSPTCAT_ND,
            spt_dog: e.ITMSPTDOG || e.ITMSPTDOG_ND,
            spt_house_dust_mite_dp: e.ITMSPTHS || e.ITMSPTHS_ND,
            spt_house_dust_mite_df: e.ITMSPTHSDF || e.ITMSPTHSDF_ND,
            spt_aspergillus: e.ITMSPTASPR || e.ITMSPTASPR_ND,
            spt_tree: e.ITMSPTTREES || e.ITMSPTTREES_ND,
            spt_peanut: e.ITMSPTPNUT || e.ITMSPTPNUT_ND,
            spt_milk: e.ITMSPTMILK || e.ITMSPTMILK_ND,
            spt_egg: e.ITMSPTEGG || e.ITMSPTEGG_ND,
            spt_alternaria_alternata: e.ITMSPTALTA || e.ITMSPTALTA_ND,
            spt_cladosporium: e.ITMSPTCLD || e.ITMSPTCLD_ND,
            spt_penicillium: e.ITMSPTPEN || e.ITMSPTPEN_ND,
            spt_positive_control: e.ITMSPTPTV || e.ITMSPTPTV_ND,
            spt_negative_control: e.ITMSPTNTV || e.ITMSPTNTV_ND,
            spt_comment_freetext: e.ITMSPTCOM
        };
        a[e.SUBJECTNUMBERSTR] = { ...a[e.SUBJECTNUMBERSTR], ...transformedEntry };
        return a;
    }, enoinfo);


    // Object.keys(column_info_map.RD_FRMENO).sort().forEach(e => {
    //     console.log(e, '=======', column_info_map.RD_FRMENO[e]);
    // });

    withdrawn.forEach((el: any) => {
        delete transformedChildInfo[el];
    });

    Object.keys(transformedChildInfo).forEach(el => {
        console.log(`${transformedChildInfo[el].subj_id}\t${transformedChildInfo[el].group}`);
    });

    // console.log(sptinfo);

    // const allEntries = Object.values(transformedChildInfo);
    // checkAllSubjects(sptinfo);





    // const hey = fs.readFileSync('ige.csv').toString();
    // const heyparse = parse(hey, { columns: true });
    // heyparse.forEach((el: any)=> {
    //    group234 = group234.filter(e => e !== el.Patient);
    // });

    // group234.forEach(el => console.log(el));


    // console.log(Object.keys(transformedChildInfo['1495' as any]));

    // console.log(form_info.filter(el => el.form_name.indexOf('irth') !== -1));
    // console.log(annotatedFilesAndColumns.RD_FRMFH);
    // console.log(demoparsed[0]);
//     const outputStream = fs.createWriteStream('./out.tsv');
//     outputStream.write(headers.join('\t') + '\n');
//     for (const each of allEntries) {
//         let outputstring = '';
//         for (const head of headers) {
//             outputstring += ((each as any)[head] as any || '') + '\t';
//         }
//         outputstring = outputstring.substring(0, outputstring.length - 1) + '\n';
//         outputStream.write(outputstring);
//     }

//     outputStream.close();


//     const columns = [
//         ['RD_FRMDEMOG', [
//             'SUBJECTNUMBERSTR',
//             '&&&&&&location',
//             'ITMDEMPRTDOB_DTS',
//             'ITMDEMGEND',
//             'ITMDEMETHNIC',
//             '&&&&&&&ethnicity_detailed',
//             '&&&&&&&ethnicity_other_freetext'
//         ]],
//         ['RD_FRMFH', [
//             'ITMFH2_CITMFATHERFDE56980CDC',
//             'ITMFH2_CITMMOTHER16A18EA4361',
//             'ITMFH2_CITMSISTER61ADA59FBED',
//             'ITMFH2_CITMBROTHERD7023A6D40',
//             'ITMFH2_CITMHALFSISTEREC0004F',
//             'ITMFH2_CITMHALFBROTHERF553A5',
//             'ITMFH6_CITMFATHERFDE56980CDC',
//             'ITMFH6_CITMMOTHER16A18EA4361',
//             'ITMFH6_CITMSISTER61ADA59FBED',
//             'ITMFH6_CITMBROTHERD7023A6D40',
//             'ITMFH6_CITMHALFSISTEREC0004F',
//             'ITMFH6_CITMHALFBROTHERF553A5',
//             'ITMFH4_CITMFATHERFDE56980CDC',
//             'ITMFH4_CITMMOTHER16A18EA4361',
//             'ITMFH4_CITMSISTER61ADA59FBED',
//             'ITMFH4_CITMBROTHERD7023A6D40',
//             'ITMFH4_CITMHALFSISTEREC0004F',
//             'ITMFH4_CITMHALFBROTHERF553A5',
//             'ITMFH7'
//         ]],
//         ['RD_FRMFI', [
//             'FI1',
//             'FI2',
//             'FI3',
//             'FI4',
//             'FI5',
//             'FI6',
//             'FI7',
//             'FI8',
//             'FI9',
//             'FI10',
//             'FI11',
//             'FI12',
//             'FI13',
//             'FI14',
//             'FI15',
//             'FI16',
//             'FI17'
//         ]],
//         ['RD_FRMMI', [
//             'MI1',
//             'MI2',
//             'MI3',
//             'MI4',
//             'MI5',
//             'MI6',
//             'MI8',
//             'MI9',
//             'MP',
//             'MS',
//             'MS3',
//             'MIW',
//             'MIE',
//             'MA',
//             'MD',
//             'MU',
//             'MT',
//             'MF',
//             'MM',
//             'ML',
//             'MG',
//             'MC'
//         ]],
//         ['RD_CB', [
//             'CB1',
//             'CB2',
//             'CB3',
//             'CB4',
//             'CB5',
//             'CB6',
//             'CB7',
//             'CB8',
//             'CB9' 
//         ]],
//         ['RD_CI', [
//             'CI1',
//             'CI2',
//             'CI3',
//             'CI4',
//             'CI5',
//             'CI6',
//             'CI7',
//             'CI8',
//             'CI9',
//             'CI10',
//             'CI11',
//             'CI12',
//             'CI13',
//             'CI14'
//         ]]
//     ];

//     const columnoutputStream = fs.createWriteStream('./out_column.tsv');
//     const chon_annotated_columns: any = {
//         1: "Subject Number",
//         2: 'Recruitment Location',
//         3: "Date of birth",
//         4: "Sex",
//         5: "Ethnicity",
//         6: 'Ethnicity detailed',
//         7: 'Ethnicity free text (if selected "other")',
//         8: "Father history of asthma",
//         9: "Mother history of asthma",
//         10: "Sister history of asthma",
//         11: "Brother history of asthma",
//         12: "Half sister history of asthma",
//         13: "Half brother history of asthma",
//         14: "Father history of eczema",
//         15: "Mother history of eczema",
//         16: "Sister history of eczema",
//         17: "Brother history of eczema",
//         18: "Half sister history of eczema",
//         19: "Half brother history of eczema",
//         20: "Father history Hayfever or allergic rhinitis",
//         21: "Mother history Hayfever or allergic rhinitis",
//         22: "Sister history Hayfever or allergic rhinitis",
//         23: "Brother history Hayfever or allergic rhinitis",
//         24: "Half sister history Hayfever or allergic rhinitis",
//         25: "Half brother history Hayfever or allergic rhinitis",
//         26: "Family History Comments",
//         27: "Father: Highest level of education",
//         28: "Father: Free text Highest level of education (if other)",
//         29: "Father: Currently employed",
//         30: "Father: Occupation (if currently employed)",
//         31: "Father: smoke now or ever smoked",
//         32: "Father: vape now or ever smoked",
//         33: "Father: ever had wheezing or whistling in his chest",
//         34: "Father: wheezing or whistling in his chest in the last 12 months (if yes to ever having wheezing) ",
//         35: "Father: ever had asthma",
//         36: "Father: asthma diagnosed by a doctor (if yes to ever having asthma)",
//         37: "Father: ever had a problem with sneezing",
//         38: "Father: past 12 months has their father had a problem with sneezing or a runny or a blocked nose when he did not have a cold or the flu (if yes to ever having a problem with sneezing)",
//         39: "Father: ever had Hayfever",
//         40: "Father: ever had eczema",
//         41: "Father: ever suffered from food allergy",
//         42: "Father: food allergy diagnosed by a doctor (if yes to ever having food allergy)",
//         43: "Father: History Comments",
//         44: "Mother: Education",
//         45: "Mother: Education specify",
//         46: "Mother: Employed",
//         47: "Mother: Occupation (if currently employed)",
//         48: "Mother: ever Smoked",
//         49: "Mother: stop smoking or reduce the number of cigarettes that she smoked when she found out that she was pregnant (if ever smoked)",
//         50: "Mother: vape now or ever vaped",
//         51: "Mother: stop vaping or reduce the amount of vaping when she found out that she was pregnant (if ever vaped)",
//         52: "Mother: Exposed to passive",
//         53: "Mother: took Nutritional supplements",
//         54: "Mother: specify Nutritional supplements (if taken)",
//         55: "Mother: ever had Wheezing or whistling",
//         56: "Mother: ever had wheezing or whistling in her chest in the last 12 months (if yes to ever having wheezed)",
//         57: "Mother: ever had asthma",
//         58: "Mother: asthma diagnosed by a doctor (if yes to ever having asthma)",
//         59: "Mother: problem with Sneezing or a runny or a blocked nose",
//         60: "Mother: the past 12 months has their mother had a problem with sneezing or a runny or a blocked nose when she did not have a cold or the flu (if yes to ever having problem)",
//         61: "Mother: having Hayfever",
//         62: "Mother: Eczema",
//         63: "Mother: Suffered from food allergy",
//         64: "Mother: food allergy diagnosed by a doctor (if yes to having suffered to food allergy)",
//         65: "Mother: HistoryComments",
//         66: "Mother: Duration of pregnancy (in complete weeks)",
//         67: "Mother: Did you need any treatment courses during pregnancy",
//         68: "Mother: the number of courses of antibiotics during pregnancy (if yes to having had treatment)",
//         69: "Birth weight",
//         70: "Head circumference at birth",
//         71: "Length at birth",
//         72: "Delivery method",
//         73: "Spent any time at NICU",
//         74: "Comments relating to birth",
//         75: "Breastfed",
//         76: "How old was your child when you stopped breastfeeding them weeks (if breastfed but not any more)",
//         77: "Vaccinated",
//         78: "Vaccinations details (if not vaccinated)",
//         79: "Mother: Working",
//         80: "Mother: how old is the child when their mother first went back to work months (if mother is working)",
//         81: "Any brothers or sisters",
//         82: "How many brothers or sisters (if yes to having any)",
//         83: "How many brothers or sisters are older (if yes to having any)",
//         84: "How many people live in the household",
//         85: "Number of adults in the household",
//         86: "Number of children in the household",
//         87: "How many bedrooms",
//         88: "Comments for household condition"
//     };
//     let colNo = 1;
//     columnoutputStream.write('filename\tcolumn_no\tcolumn_description\toriginal_description_from_inform' + '\n');
//     for (let each of columns) {
//         for (let label of each[1]) {
//             columnoutputStream.write(`out.tsv\t${colNo}\t${chon_annotated_columns[colNo]}\t${column_info_map[each[0] as string][label]}\n`);
//             colNo++;
//         }
//     }

//     columnoutputStream.close();


}

main();
