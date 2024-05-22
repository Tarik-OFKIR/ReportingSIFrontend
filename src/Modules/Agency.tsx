export interface Agency {
    name: string;
    id: number;
    code: string;// need to refactor in backend
    type: string;
    address: string;
    succursaleId: number;
    bprId: number;
}