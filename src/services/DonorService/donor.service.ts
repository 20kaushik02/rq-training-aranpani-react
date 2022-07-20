import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { deserialize, serialize } from "serializr";
import { useState } from "react";
import { Donor } from "../../models/Donor/donor.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { PaginationModel } from '../../models/Pagination/pagination.model';
import { generatePath } from "react-router-dom";

const DonorService = () => {
    const [donorLoading, setDonorLoading] = useState<boolean>(false);
    const [donorList, setDonorList] = useState<Donor[]>([]);
    const [donorPagination, setDonorPagination] = useState<PaginationModel>();
    const [donor, setDonor] = useState<Donor>();

    const fetchDonorList = async (params: {
        page?: number,
        limit?: number
        search?: string,
        role?: string,
        representative_id?: number
    } = {}) => {
        try {
            setDonorLoading(true);
            params.role = "donor"
            const { data } = await axiosInstance.get(ApiRoutes.DONORS, {
                params: {
                    ...params,
                    limit: params.limit ?? 50,
                }
            });
            const donors: any = deserialize(Donor, data['donors']);
            setDonorList(donors);
            setDonorPagination(deserialize(PaginationModel, data))
        } catch (error) {
            console.error("donor", error)
        } finally {
            setDonorLoading(false);
        }
    };

    const fetchDonor = async (donorId: string) => {
        try {
            setDonorLoading(true);
            const { data } = await axiosInstance.get(generatePath(ApiRoutes.DONOR, { donorId }));
            const donor = deserialize(Donor, data?.donor)
            setDonor(donor)
        } catch (error) {
            console.log("donor", error)
        } finally {
            setDonorLoading(false);
        }
    };

    return {
        donorLoading,
        donorList,
        donorPagination,
        donor,
        fetchDonorList,
        fetchDonor,
    }
}

export default DonorService;