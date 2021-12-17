package types

type RespError struct {
	Success bool     `json:"success"`
	Error   string   `json:"error"`
	Params  []string `json:"params"`
}