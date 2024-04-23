#!/bin/bash

get_abs_filename() {
  # $1 : relative filename
  echo "$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
}

if ! [ -d confluent-7.6.0 ]; then
    echo "Installing confluent"
    curl -s -L https://packages.confluent.io/archive/7.6/confluent-7.6.0.tar.gz | tar xz -
    version=$(./confluent-7.6.0/bin/confluent --version)
    echo Installed $version
fi

java_version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | awk -F '.' '{sub("^$", "0", $2); print $1$2}')
if ! [[ java_version == "110" ]]; then

  java_11_location=/usr/local/opt/openjdk@11

  if ! [ -d $java_11_location ]; then
    echo "Could not find Java 11. Try one of the following solutions:" >> /dev/stderr
    echo " 1) Set JAVA_HOME to directory of Java 11 installation." >> /dev/stderr
    echo " 2) Install java 11 to ${java_11_location}." >> /dev/stderr
    echo "" >> /dev/stderr
    exit 1
  fi

  export JAVA_HOME=$java_11_location
fi

location=$(get_abs_filename ./confluent-7.6.0)
export CONFLUENT_HOME=$location

$location/bin/confluent "$@"