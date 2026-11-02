public class Ex06 {
    public static void sequence(int nbr) {
        if (nbr < 0) {
            return;
        }

        String current = "1";
        for (int iteration = 0; iteration <= nbr; iteration++) {
            System.out.println(current);
            if (iteration < nbr) {
                StringBuilder next = new StringBuilder();
                int index = 0;
                while (index < current.length()) {
                    char digit = current.charAt(index);
                    int count = 1;
                    while (index + count < current.length() && current.charAt(index + count) == digit) {
                        count++;
                    }
                    next.append(count).append(digit);
                    index += count;
                }
                current = next.toString();
            }
        }
    }
}
