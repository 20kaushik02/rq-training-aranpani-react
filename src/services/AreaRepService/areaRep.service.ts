import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { deserialize } from "serializr";
import { useState } from "react";
import { PaginationModel } from "../../models/Pagination/pagination.model";
import { AreaRepresentative } from "../../models/AreaRepresentative/areaRepresentative.model";

const AreaRepService = () => {

    const [areaRepLoading, setAreaRepLoading] = useState<boolean>(false);
    const [areaRepList, setAreaRepList] = useState<AreaRepresentative[]>([]);
    const [repPagination, setRepPagination] = useState<PaginationModel>();

    const fetchAreaRepList = async (params: {
        search?: string
        limit?: number
        page?: number
    } = {}) => {
        try {
            params.limit = 50
            setAreaRepLoading(true);
            const { data } = await axiosInstance.get(ApiRoutes.AREA_REPRESENTATIVES, { params });
            const areaReps = deserialize(AreaRepresentative, data['area_representatives'] as AreaRepresentative[]);
            setAreaRepList(areaReps);
            setRepPagination(deserialize(PaginationModel, data))
        } catch (error) {
            console.log("rep list", error)
        } finally {
            setAreaRepLoading(false);
        }
    };

    return {
        repPagination,
        areaRepList,
        areaRepLoading,
        fetchAreaRepList,
    }
}

export default AreaRepService;