package wrapper
import (
	"path/filepath"
	"runtime"
	"strconv"

	"github.com/sirupsen/logrus"
)

func Fatal(string string) {
	_, file, line, ok := runtime.Caller(1)
	if ok {
		logrus.Fatal("[" + filepath.Base(file) + ":" + strconv.Itoa(line) + "] " + string)
	}
}