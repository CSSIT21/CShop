package types

type RespUploadStat struct {
	Success       bool   `json:"success"`
	OriginalLink  string `json:"original_link,omitempty"`
	ThumbnailLink string `json:"thumbnail_link,omitempty"`
	FileToken     string `json:"file_token,omitempty"`
}
