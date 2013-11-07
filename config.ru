Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

require "bundler/setup"
require 'sass/plugin/rack'
use Sass::Plugin::Rack

Bundler.require(:default)

run Rack::Jekyll.new(:destination => '_site')