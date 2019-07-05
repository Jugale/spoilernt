#!/bin/bash

montage pause.png switcher.png -tile 2x1 -geometry +0+0 github.png
convert -geometry x512 github.png github.png
