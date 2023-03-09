<?php 
    $files_case1 = ['a1', 'a2', 'a3'];
    $replacements_case1 = [
        [
            'oldUrl' => 'b1',
            'action' => 'update'
        ],
        [
            'oldUrl' => 'b2',
            'action' => 'update'
        ]
    ];   
    //
    $files_case2 = [null, null, 'a3'];
    $replacements_case2 = [];
    //
    $files_case3 = ['a1', null, null, 'a3'];
    $replacements_case3 = [];
    //
    $galleries_case4 = ['b1', 'b2', 'b3'];
    $files_case4 = [null, 'a2', null];
    $replacements_case4 = [
        [
            'oldUrl' => 'b2',
            'action' => 'update'
        ],
    ];
    //
    $galleries = ['b1', 'b2'];    
    //
    echo "<pre>";
    $cloned1 = test_uploads($files_case1, $galleries, $replacements_case1);
    $results_case1 = [
        'a1', 'a2', 'a3'
    ];
    echo 'case1: <br/>';
    print_r($cloned1);
    //echo 'case1: ' . ($cloned1 === $results_case1 ? 'true' : 'false') . '<br/>';
    //
    $cloned2 = test_uploads($files_case2, $galleries, $replacements_case2);
    $results_case2 = [
        'b1', 'b2', 'a3'
    ];
    echo 'case2: <br/>';
    print_r($cloned2);
    //echo 'case2: ' . ($cloned2 === $results_case2 ? 'true' : 'false') . '<br/>';
    //
    $cloned3 = test_uploads($files_case3, $galleries, $replacements_case3);
    $results_case3 = [
        'b1', 'b2', 'a1', 'a3'
    ];
    echo 'case3: <br/>';
    print_r($cloned3);
    //echo 'case3: ' . ($cloned3 === $results_case3 ? 'true' : 'false') . '<br/>';
    //
    $cloned4 = test_uploads($files_case4, $galleries_case4, $replacements_case4);
    echo 'case4: <br/>';
    print_r($cloned4);
    die();