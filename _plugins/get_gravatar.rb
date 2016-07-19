require 'digest/md5'
require 'open-uri'
require 'nokogiri'

module Nokogiri
	module XML
		class NodeSet
			def to_liquid
				self
			end
		end
		class Element
			def to_liquid
				self
			end
		end
	end
end

module Jekyll
	module GravatarFilter
		attr_accessor:gravinfo
		private :hash

		def get_gravatar(e)
			"https://www.gravatar.com/avatar/#{hash(e)}"
		end

		def hash(email)
			Digest::MD5.hexdigest(email.downcase)
		end

		def gravatar(e)
			gravatar_url = "https://secure.gravatar.com/#{hash(e)}.xml"
  			@gravinfo = Nokogiri.XML(OpenURI.open_uri(gravatar_url).read)
		end

		def get_gravatar_Name(e)
			gravatar(e)
  			gravinfo.xpath("//name//formatted")
		end

		def get_gravatar_aboutMe(e)
			gravatar(e)
  			gravinfo.xpath("//aboutMe")
		end
	end
end

Liquid::Template.register_filter(Jekyll::GravatarFilter)