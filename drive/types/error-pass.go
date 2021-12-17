package types

type PassError struct {
	Message string
	Params  []string
}

func (v *PassError) Error() string {
	return v.Message
}