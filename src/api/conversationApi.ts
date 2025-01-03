import {
    TCreateConversationResponse,
    TCreateGroup,
    TGetConversation,
    TGetListConversations,
    TGroupConversation,
    TIndividualConversation,
} from "@/models/conversation.model";
import axiosClient from "./_httpAxios";
import { API } from "@/constants/api.constant";

const ServiceConversation = {
    getListConversations: (params: TGetListConversations) =>
        axiosClient.get<any, Array<TIndividualConversation | TGroupConversation>>(
            API.CONVERSATION.GET,
            { params }
        ),

    createConversationIndividual: (userId: string) =>
        axiosClient.post<TCreateConversationResponse, any>(`${API.CONVERSATION.CREATE}/${userId}`),

    createGroup: (params: TCreateGroup) => axiosClient.post(API.CONVERSATION.CREATE_GROUP, params),

    getConversationById: (id: string) =>
        axiosClient.get<any, TGetConversation>(`${API.CONVERSATION.GET}/${id}`),

    deleteConversation: (id: string) => axiosClient.delete(`${API.CONVERSATION.DELETE}/${id}`),

    getMemberInConversation: (id: string) =>
        axiosClient.get(`${API.CONVERSATION.GET}/${id}/members`),

    addMembersToConver: (userIds, coversationIds) =>
        axiosClient.post(`${API.CONVERSATION.GET}/${coversationIds}/members`, {
            userIds,
        }),

    leaveGroup: (conversationId: string) =>
        axiosClient.delete(`${API.CONVERSATION.DELETE}/${conversationId}/members/leave`),

    deleteMember: (conversationId, userId) =>
        axiosClient.delete(`${API.CONVERSATION.DELETE}/${conversationId}/members/${userId}`),

    changeNameConversation: (conversationId, name) =>
        axiosClient.patch(`${API.CONVERSATION.GET}/${conversationId}/name`, {
            name,
        }),

    getLastViewOfMembers: (conversationId: string) =>
        axiosClient.get(`${API.CONVERSATION.GET}/${conversationId}/last-view`),

    getSummaryInfoGroup: (conversationId: string) =>
        axiosClient.get(`${API.CONVERSATION.GET}/${conversationId}/summary`),

    joinGroupFromLink: (conversationId: string) =>
        axiosClient.post(`${API.CONVERSATION.GET}/${conversationId}/members/join-from-link`),

    changeStatusForGroup: (conversationId, isStatus) =>
        axiosClient.patch(`${API.CONVERSATION.GET}/${conversationId}/join-from-link/${isStatus}`),

    changAvatarGroup: (conversationId, file) =>
        axiosClient.patch(`${API.CONVERSATION.GET}/${conversationId}/avatar`, file),

    addManagerGroup: (converId, userIds) =>
        axiosClient.post(`${API.CONVERSATION.GET}/${converId}/managers`, {
            managerIds: userIds,
        }),

    deleteManager: (converId, userIds) =>
        axiosClient.delete(`${API.CONVERSATION.DELETE}/${converId}/managers`, {
            data: {
                managerIds: userIds,
            },
        }),
};

export default ServiceConversation;
