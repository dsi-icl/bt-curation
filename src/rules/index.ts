import * as checks from './checks';

export function checkAllSubjects(obj: any) {
    Object.values(obj).forEach((el : any) => {
        Object.values(checks).forEach((func: any) => {
            func(el);
        });
    });
}