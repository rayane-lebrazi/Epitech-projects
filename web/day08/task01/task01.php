<?php
function discover_type(int $age, string $name, float $gpa, bool $isStudent) {
    if( $isStudent == TRUE ){
        printf("Hello my name is %s, I'm %d years old. I'm a student at Epitech with a GPA of %f.",$name,$age,$gpa);
    }else {
        printf("Hello my name is %s, I'm %d years old.I'm not a student.",$name,$age);
    }
}
?>