import { API } from "@/constants/api.constant";
import {
    TCreateGroup,
    TGetListConversations
} from "@/models/conversation.model";
import { del, get, patch, post } from "./instance/httpMethod";

const ServiceConversation = {
    getListConversations: (params: TGetListConversations) =>
         get(
            API.CONVERSATION.GET,
            { params }
        ),
    createConversationIndividual: (userId: string) =>
         post(`${API.CONVERSATION.CREATE}/${userId}`, {}),

    createGroup: (params: TCreateGroup) =>  post(API.CONVERSATION.CREATE_GROUP, params),

    getConversationById: (id: string) =>
         get(`${API.CONVERSATION.GET}/${id}`),

    deleteConversation: (id: string) =>  del(`${API.CONVERSATION.DELETE}/${id}`),

    getMemberInConversation: (id: string) =>
         get(`${API.CONVERSATION.GET}/${id}/members`),

    addMembersToConver: (userIds, coversationIds) =>
          post(`${API.CONVERSATION.GET}/${coversationIds}/members`, {
            userIds,
        }),

    leaveGroup: (conversationId: string) =>
         del(`${API.CONVERSATION.DELETE}/${conversationId}/members/leave`),

    deleteMember: (conversationId, userId) =>
         del(`${API.CONVERSATION.DELETE}/${conversationId}/members/${userId}`),

    changeNameConversation: (conversationId, name) =>
         patch(`${API.CONVERSATION.GET}/${conversationId}/name`, {
            name,
        }),

    getLastViewOfMembers: (conversationId: string) =>
         get(`${API.CONVERSATION.GET}/${conversationId}/last-view`),

    getSummaryInfoGroup: (conversationId: string) =>
         get(`${API.CONVERSATION.GET}/${conversationId}/summary`),

    joinGroupFromLink: (conversationId: string) =>
         post(`${API.CONVERSATION.GET}/${conversationId}/members/join-from-link`, {}),

    changeStatusForGroup: (conversationId, isStatus) =>
         patch(`${API.CONVERSATION.GET}/${conversationId}/join-from-link/${isStatus}`),

    changAvatarGroup: (conversationId, file) =>
         patch(`${API.CONVERSATION.GET}/${conversationId}/avatar`, file),

    addManagerGroup: (conversationId, userIds) =>
         post(`${API.CONVERSATION.GET}/${conversationId}/managers`, {
            managerIds: userIds,
        }),

    deleteManager: (conversationId, userIds) =>
         del(`${API.CONVERSATION.DELETE}/${conversationId}/managers`, {
            data: {
                managerIds: userIds,
            },
        }),
};

export default ServiceConversation;
