package fr.formation.backend.dtos;

import fr.formation.backend.constraints.ValidateSenderType;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

// DTO to create message
public class MessageDto {

    @NotBlank
    @Size(max = 255)
    private String text;

    @NotNull
    private Long chatId;

    @Size(max = 80)
    @NotBlank
    private String senderName;

    @NotNull
    @ValidateSenderType(acceptedValues = {"guest", "speaker"})
    private String senderType;

    public MessageDto() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderType() {
        return senderType;
    }

    public void setSenderType(String senderType) {
        this.senderType = senderType;
    }
}
