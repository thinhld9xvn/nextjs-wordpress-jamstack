<?php 
    namespace Posts;
    use Taxonomies\TaxGetMetaTermsUtils;
    class PostsGetAllListsUtils {   
        public static function get($params) {
            /* $default_params = [$lang => 'vi', 
                                    $post_type => 'post', 
                                    $tax => null, 
                                    $term => null, 
                                    $limit => -1, 
                                    $slug => '', 
                                    $searchable => false, 
                                    $related => true] */
            extract($params);             
           $args = array(
               'post_type' => $post_type,
               'posts_per_page' => $limit,
               'no_paging' => true,
               'order' => 'DESC',
               'orderby' => 'date',
               'lang' => $lang
           );
           if ( !empty($tax) && !empty($term) ) :
                $args['tax_query'] = array(
                    array(
                        'taxonomy' => $tax,
                        'field'    => 'slug',
                        'terms'    => $term,
                    )
                );
           endif;
           if (!empty($slug)) :
                $args['name'] = $slug;
           endif;
           if ($related) :
                $post = get_page_by_path($slug, OBJECT, 'post');
                $taxonomy = PostsGetTaxonomyUtils::get_taxonomy($post, $post_type);
                $post_categories = TaxGetMetaTermsUtils::get($post->ID, !empty($tax) ? $tax : $taxonomy);  
                $post_category = $post_categories[0];
                $args['post__not_in'] = array($post->ID);
                $args['cat'] = $post_category['id'];
                $args['posts_per_page'] = $limit;
                if ( !empty($args['name']) ) :
                    unset($args['name']);
                endif;
            endif;
           $postsList = query_posts($args);
           $results = []; 
           //graphql_debug($searchable);
           foreach($postsList as $key => $post) :
                $title = $post->post_title;
                $post_type = $post->post_type;
                if ( $post->ID === 0 || empty($post->post_name) ) continue;
                if ( !in_array($post_type, FALSE === $searchable ? ['services', 'hoat-dong-xa-hoi', 'post', 'page'] : 
                                                                    ['services', 'hoat-dong-xa-hoi', 'post']) ) continue;                
                if ( !empty($s) ) :
                    if ( FALSE === strpos(strtolower($title), strtolower($s)) ) continue;
                endif;
                $excerpt = short_text(get_the_excerpt($post), 400);
                $content = $post->post_content;
                $day = get_the_date("d", $post);
                $month = get_the_date("m", $post);
                $year = get_the_date("Y", $post);
                $taxonomy = PostsGetTaxonomyUtils::get_taxonomy($post, $post_type);
                $categories = TaxGetMetaTermsUtils::get($post->ID, !empty($tax) ? $tax : $taxonomy);
                $thumbnail = get_the_post_thumbnail_url($post->ID, 'large');
                $background = get_the_post_thumbnail_url($post->ID, 'article_background');
                $thumbnail = $thumbnail ? $thumbnail : '';
                $background = $background ? $background : '';      
                $viewcount = get_post_meta($post->ID, '_post_view', true);
                $viewcount = $viewcount ? (int) $viewcount : 0;        
                $pll_id = pll_get_post($post->ID, $lang === 'vi' ? 'ja' : 'vi');
                $polylang_post = !empty($pll_id) && $pll_id !== $post->ID ? filter_permalink(get_the_permalink($pll_id)) : ''; 
                $r = [
                    POST_FIELDS::ID_GQL_FIELD => $post->ID,
                    POST_FIELDS::URL_GQL_FIELD => filter_permalink(get_the_permalink($post)),
                    POST_FIELDS::SLUG_GQL_FIELD => $post->post_name,
                    POST_FIELDS::EXCERPT_GQL_FIELD => apply_filters('the_content', $excerpt),
                    POST_FIELDS::CONTENTS_GQL_FIELD => apply_filters('the_content', $content),
                    POST_FIELDS::TITLE_GQL_FIELD => htmlspecialchars_decode($title),
                    POST_FIELDS::TEXT_GQL_FIELD => htmlspecialchars_decode($title), 
                    POST_FIELDS::NAME_GQL_FIELD => htmlspecialchars_decode($title),                
                    POST_FIELDS::THUMBNAIL_GQL_FIELD => $thumbnail,   
                    POST_FIELDS::POST_TYPE_GQL_FIELD => $post_type,
                    POST_FIELDS::BACKGROUND_GQL_FIELD => $background,          
                    POST_FIELDS::POLYLANG_POST_GQL_FIELD => $polylang_post,   
                    POST_FIELDS::DATE_CREATED_GQL_FIELD => [
                        [
                            POST_FIELDS::DAY_GQL_FIELD => $day,
                            POST_FIELDS::MONTH_GQL_FIELD => $month,
                            POST_FIELDS::YEAR_GQL_FIELD => $year
                        ]
                    ],
                    POST_FIELDS::CATEGORIES_GQL_FIELD => $categories,
                    POST_FIELDS::VIEWCOUNT_GQL_FIELD => $viewcount
                ];
                $results[] = $r;
            endforeach;
           wp_reset_query();
           return $results;
        }
    }