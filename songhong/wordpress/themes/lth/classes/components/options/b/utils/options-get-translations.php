<?php
    namespace Options;
    use Pll_Translations;
    
    class OptionsGetTranslations {
        public static function get($lang = 'vi') {
            $results = [];
            $pll_strings = Pll_Translations::$pll_strings;
            foreach ($pll_strings as $key => $string) :
                $results[$key] = pll_translate_string($string, $lang);
            endforeach;
            return json_encode($results);
        }
        public static function get_value($key, $lang = 'vi') {
            $pll_strings = Pll_Translations::$pll_strings;
            return pll_translate_string($pll_strings[$key], $lang);
        }
    }