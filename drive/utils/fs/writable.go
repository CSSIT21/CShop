package fs

import "golang.org/x/sys/unix"

func Writable(path string) bool {
	return unix.Access(path, unix.W_OK) == nil
}
