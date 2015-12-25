module.exports = function(grunt){
	var jpegtran = require('imagemin-jpegtran');
	grunt.initConfig({
		dest_path:'distribution/',
		copy: {
			main:{
				src:'index.html',
				dest:'<%=dest_path%>',
				options:{
		  			process:function(content,srcpath){
		  				//javascript replaces
		  				content = content.replace('<script src="js/jquery.imageScroll.js"></script>','');
		  				content = content.replace('<script src="colorbox/jquery.colorbox-min.js"></script>','');
		  				//header style integrate
		  				var headerStyle = grunt.file.read('css/header.css');
		  				headerStyle = headerStyle.replace(/\/\*(.*\n*)*\*\//g,'');
		  				headerStyle = headerStyle.replace(/\.\.\//g,'');
		  				content = content.replace('<style></style>','<style>'+headerStyle+'</style>');
		  				var key = 'AIzaSyBOnh9Do77ZCfADS_eI9IS-FqMmuUrMTZo'
		  				content = content.replace(/https:\/\/maps\.googleapis\.com\/maps\/api\/js\?key=.*&#38;/,'https:\/\/maps\.googleapis\.com\/maps\/api\/js\?key='+key+'&#38;')
		  				return content;
		  			}
		  		}
			},
			favicons:{
				src:['favicon.ico'],
				dest:'<%=dest_path%>'
			},
			imgs:{
				src: ['imgs/*','imgs/ie/*'],
		    	dest: '<%=dest_path%>'
			},
			css:{
				src:'css/*.css',
				dest:'<%=dest_path%>',
				options:{
		  			process:function(content,srcpath){
		  				return content.replace(/\/\*\!/g,'/*');
		  			}
		  		}
			},
			pics:{
				src:['pics/*.png','pics/*.jpg'],
				dest:'<%=dest_path%>'
			},
			js:{
				src:['js/*','!js/jquery.imageScroll.js'],
				dest:'<%=dest_path%>'
			},
			fonts:{
				src:'fonts/**',
				dest:'<%=dest_path%>'
			},
			bootstrap:{
				files:[
					//{src:'bootstrap/javascripts/bootstrap.min.js',dest:'<%=dest_path%>'}
				]
			},
			colotbox:{
				files:[
					{src:['colorbox/**','!colorbox/jquery.colorbox-min.js'],dest:'<%=dest_path%>'}
				]
			}
		},
		postcss:{
			options:{
				map:false,
				processors:[
					require('autoprefixer')({browsers: 'last 10 versions'})
       				//require('cssnano')()
				]
			},
			dist:{
				src:'<%=dest_path%>/css/style.css'
			}
		},
		cssmin:{
			main:{
				files:{
					'<%=dest_path%>/css/style.css':'<%=dest_path%>/css/style.css'
				}
			}
		},
		removelogging: {
			dist: {
		    	src: '<%=dest_path%>js/*'
			}
		},
		concat:{
			bootstrap:{
	    		src: [
	    			'bootstrap/javascripts/bootstrap/transition.js',
	    			'bootstrap/javascripts/bootstrap/carousel.js',
	    			'bootstrap/javascripts/bootstrap/scrollspy.js'
	    		],
	    		dest: '<%=dest_path%>bootstrap/javascripts/bootstrap.min.js'
	   		},
	   		other:{
	   			files:[
					{'<%=dest_path%>js/script.js':[
						'js/jquery.imageScroll.js',
						'colorbox/jquery.colorbox-min.js',
						'js/script.js'
					]}
				]
	   		}
		},
		uglify:{
			bootstrap:{
				files:[
					{'<%=dest_path%>bootstrap/javascripts/bootstrap.min.js':'<%=dest_path%>bootstrap/javascripts/bootstrap.min.js'}
				]
			},
			modernizr:{
				files:[
					{'<%=dest_path%>js/modernizr-custom.js':'<%=dest_path%>js/modernizr-custom.js'}
				]
			},
			other:{
				files:[
					{'<%=dest_path%>js/script.js':'<%=dest_path%>js/script.js'}
				]
			}
		},
		imagemin:{
			imgs: {
			    files: [{
				    expand: true,
				    cwd: '<%=dest_path%>',
				    src: ['imgs/**.{png,jpg,gif}'],
				    dest: '<%=dest_path%>'
			    }]
			},
			pics: {
				options: {
        			optimizationLevel: 3,
        			use: [jpegtran()]
        		},
			    files: [{
				    expand: true,
				    cwd: '<%=dest_path%>',
				    src: ['pics/**.{png,jpg,gif}'],
				    dest: '<%=dest_path%>'
			    }]
			},
			/*favicon:{
				files: [{
				    expand: true,
				    cwd: '<%=dest_path%>',
				    src: ['favicon.png'],
				    dest: '<%=dest_path%>'
			    }]
			}*/
		},
		'ftp-deploy':{
			build: {
				auth: {
					host: 'ftp.katlex.nichost.ru',
					port: 21,
					authKey: 'key1'
				},
				src: '<%=dest_path%>',
				dest: 'bashinsky.pro/docs/portfolio/momentio',
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-remove-logging');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');


	grunt.registerTask('default',['copy','postcss','cssmin','concat','removelogging','uglify','imagemin']);
	grunt.registerTask('ftp',['ftp-deploy']);
	grunt.registerTask('bootstrap-js-build',['concat:bootstrap']);
	grunt.registerTask('imgmin',['imagemin']);
	grunt.registerTask('full',['copy','postcss','cssmin','concat','removelogging','uglify','imagemin','ftp-deploy']);
}