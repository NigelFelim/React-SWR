/* eslint-disable @typescript-eslint/no-explicit-any */
class GetPostsListModelPack {
    data!: GetPostsListModelData[];

    constructor(json: any) {
        this.mapFromJson(json);
    }

    mapFromJson(json: any) {
        const temp: GetPostsListModelData[] = [];

        if (json.data.length > 0 && json.data != null) {
            for (let i = 0; i < json.data.length; i++) {
                temp.push(new GetPostsListModelData(json.data[i]))
            }
        }

        this.data = temp;
    }
}

class GetPostsListModelData {
    id!: number;
    title!: string;
    body!: string;

    constructor(json: any) {
        this.mapFromJson(json);
    }

    mapFromJson(json: any) {
        this.id = json["id"]
        this.title = json["title"];
        this.body = json["body"];
    }
}

export { GetPostsListModelPack, GetPostsListModelData };