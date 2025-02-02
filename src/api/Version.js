import { authorization, Get, Put } from "./Api";

export const VersionCode = "ICP13412594123GD";

export async function GetVersions(pagination,queryKey,year,type,successCallback) {
    await Get(`/Admin/GetVersions?page=${pagination.current}&pageSize=${pagination.size}&queryKey=${queryKey}`+
        `year=${year}&type=${type}`,authorization(),successCallback
    );
}

export async function Publish(version,userId,successCallback) {
    await Put(`/Admin/Publish/${userId}`,authorization(),version,successCallback);
}
