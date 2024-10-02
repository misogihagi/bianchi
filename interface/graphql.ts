type Id=string //000000-000000 

export interface Card {
    id:Id,
    front:string,
    back:string,
}
export interface Image {
    id:Id,
    data: string // base64
}
