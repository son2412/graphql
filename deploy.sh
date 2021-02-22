#!/bin/bash

echo 'Starting to Deploy...'
ssh -i ../id_rsa_test -tt ubuntu@13.212.177.234 "pwd && ls"
