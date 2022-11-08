export class ServiceModel {
    constructor(
        public data: any,
        public errors: ServiceErrorsModel[],
        public statusCode: number,
    ) { }
}
export class ServiceErrorsModel {
    code?: number;
    parameters?: {}[];
}