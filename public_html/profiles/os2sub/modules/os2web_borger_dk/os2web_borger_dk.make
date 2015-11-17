api = 2
core = 7.x

;; OS2Web projects:

; OS2Web Modules

projects[os2web_taxonomies][type] = "module"
projects[os2web_taxonomies][download][type] = "git"
;projects[os2web_taxonomies][download][tag] = "1.10"
projects[os2web_taxonomies][download][branch] = "master"
projects[os2web_taxonomies][download][url] = "https://github.com/OS2web/os2web_taxonomies.git"

;; Contrib modules below:

; Libraries

; Contrib modules

; Features + related
projects[features][subdir] = "contrib"
projects[features][version] = "2.0-beta2"

projects[strongarm][subdir] = "contrib"
projects[strongarm][version] = "2.0"

; Panels

; Basic

projects[ctools][subdir] = "contrib"
projects[ctools][version] = "1.3"

projects[media][subdir] = "contrib"
projects[media][version] = "2.0-unstable7"
projects[media][patch][] = "http://drupal.org/files/media-media_browser-preview_javascript_incompatibility-1743040.patch"
