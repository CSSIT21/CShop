package config

import (
	"io/ioutil"

	"github.com/sirupsen/logrus"
	"gopkg.in/yaml.v3"

	"github.com/CSSIT21/CShop-Drive/utils/wrapper"
)

var C = &configStruct{}

func init() {
	// Load configurations to struct
	yml, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		wrapper.Fatal("UNABLE TO READ YAML CONFIGURATION FILE")
	}
	err = yaml.Unmarshal(yml, C)
	if err != nil {
		wrapper.Fatal("UNABLE TO PARSE YAML CONFIGURATION FILE")
	}

	// Apply configurations
	logrus.SetLevel(logrus.WarnLevel)
}
