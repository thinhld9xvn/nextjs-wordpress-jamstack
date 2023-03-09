<?php   
    $this->post_types[] = array(        
        'label' => 'Hồ sơ',
        'description' => 'Hồ sơ',
        'slug' => 'briefcase',
        'taxonomy' => [
            'label' => 'Danh mục hồ sơ',
            'slug' => 'briefcase-tax'
        ]
    );
    $this->post_types[] = array(        
        'label' => 'Slider',
        'description' => 'Slider',
        'slug' => 'slider'
    );
    $this->post_types[] = array(        
        'label' => 'Dịch vụ',
        'description' => 'Dịch vụ',
        'slug' => 'services',
        'taxonomy' => [
            'label' => 'Danh mục dịch vụ',
            'slug' => 'services-tax',
            'rewrite' => array(
                'slug' => 'danh-muc-dichvu'
            )
        ]
    );
    $this->post_types[] = array(        
        'label' => 'Hoạt động xã hội',
        'description' => 'Hoạt động xã hội',
        'slug' => 'hoat-dong-xa-hoi'
    );
