/* eslint-disable @typescript-eslint/no-explicit-any */
class GetTodosListModelPack {
    data!: GetTodosListModelData[];

    constructor(json: any) {
        this.mapFromJson(json);
    }

    mapFromJson(json: any) {
        const temp: GetTodosListModelData[] = [];

        if (json.data.length > 0 && json.data != null) {
            for (let i = 0; i < json.data.length; i++) {
                temp.push(new GetTodosListModelData(json.data[i]))
            }
        }

        this.data = temp;
    }
}

class GetTodosListModelData {
    id!: number;
    title!: string;
    isCompleted!: boolean;

    constructor(json: any) {
        this.mapFromJson(json);
    }

    mapFromJson(json: any) {
        this.id = json["id"]
        this.title = json["title"];
        this.isCompleted = json["completed"];
    }
}

export { GetTodosListModelPack, GetTodosListModelData };