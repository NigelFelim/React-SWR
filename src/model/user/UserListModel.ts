/* eslint-disable @typescript-eslint/no-explicit-any */
class UserListModelPack {
    message!: string;
    data!: UserListModelData[];
    paginationData!: UserListPaginationData;

    constructor(json: any) {
        this.mapFromJson(json);
    }

    mapFromJson(json: any) {
        const temp: UserListModelData[] = [];

        if (json.data.records !== null) {
            for (let i = 0; i < json.data.records.length; i++) {
                temp.push(new UserListModelData(json.data.records[i]));
            }
        }

        this.message = json["message"];
        this.data = temp;
        this.paginationData = new UserListPaginationData(json["data"]["metadata"]);
    }
}

class UserListModelData {
    userId!: number;
    nip!: string;
    userName!: string;
    email!: string;
    roleId!: number;
    roleName!: string;
    roleLabel!: string;
    userZoneId!: number;
    salesZoneType!: string;
    salesZoneId!: number;
    salesZoneName!: string;

    constructor(json: any) {
        this.mapFromJson(json);
    }

    mapFromJson(json: any) {
        this.userId = json["user_id"];
        this.nip = json["nip"];
        this.userName = json["username"];
        this.email = json["email"] ?? "-";
        this.roleId = json["role_id"];
        this.roleName = json["role_name"];
        this.roleLabel = json["role_label"];
        this.userZoneId = json["user_zone_id"];
        this.salesZoneType = json["sales_zone_type"];
        this.salesZoneId = json["sales_zone_id"];
        this.salesZoneName = json["sales_zone_name"];
    }
}

class UserListPaginationData {
    limit!: number;
    currentPage!: number;
    totalPage!: number;
    totalData!: number;

    constructor(json: any) {
        this.mapFromJson(json);
    }

    mapFromJson(json: any) {
        this.limit = json["total_data_per_page"];
        this.currentPage = json["current_page"];
        this.totalPage = json["total_page"];
        this.totalData = json["total_data"];
    }
}

export { UserListModelPack, UserListModelData, UserListPaginationData };